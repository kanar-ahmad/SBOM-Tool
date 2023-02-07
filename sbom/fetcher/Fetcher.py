from enum import Enum, unique

import requests
from packageurl import PackageURL

from sbom.model.component import Component


@unique
class _URL(Enum):
    NPM = 'https://registry.npmjs.org/{}/{}'  # example: https://registry.npmjs.org/axios/1.2.2
    Python = ''
    #Java = ''
    #PHP = ''
    #CPP = ''


class Fetcher:
    def __init__(self, rate_limit: int = None):
        self.rate_limit = rate_limit

        self.visited_packages = set()  # packages must be unique
        self.graph_visited = {}

    def fetchNPM(self, name: str, value: str):
        url = _URL.NPM.value.format(name, value)
        print(url)
        response = requests.get(url)

        print(response.status_code)
        if response.status_code == 200:
            data = response.json()
            result = {
                'name': data['name'],
                'version': data.get('version', None),
                'license': data.get('license', None),
                'description': data.get('description', None),
                'type': data.get('type', None),
                'repository_type': data.get('repository', None).get('type', None),
                'repository_url': data.get('repository', None).get('url', '').split('+')[1],
                'author': data.get('author', None).get('name', None),
                'bugs_url': data.get('bugs').get('url', None),
                'homepage': data.get('homepage', None),
                'file_count': data.get('dist').get('fileCount', None),
                'unpacked_size': data.get('dist').get('unpackedSize', None),
                'dependencies': data.get('dependencies', None),
                'devDependencies': data.get('devDependencies', None),
            }
            return result
        return None

    def fetchMaven(self, group_id: str, artifact_id: str, version: str) -> dict:

        url = f'https://search.maven.org/solrsearch/select?q=g:{group_id}%20AND%20a:{artifact_id}%20AND%20v:{version}'
        print(url)

        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        return None

    def fetchPyPi(self, name: str, version: str = None):
        if not name:
            return None
        result = {
            'information': {},
            'dependencies': []
        }

        self.visited_packages.add(name)

        import re
        if version:
            version_match = re.search(r'\d+(\.\d+)+', version)
            if version_match:
                version = version[version_match.start():version_match.end()]
                url = f'https://pypi.org/pypi/{name}/{version}/json'
            else:
                url = f'https://pypi.org/pypi/{name}/json'
        else:
            url = f'https://pypi.org/pypi/{name}/json'

        response = requests.get(url)
        data = response.json()
        print("URL:  ", url)
        print('VISITED: ', self.visited_packages)
        print("DATA:  ", data.get('info'))

        if data.get('info'):
            info = data['info']
            name = info['name'] if info['name'] else None
            version = info['version'] if info['version'] else None
            author = info['author'] if info['author'] else None
            author_email = info['author_email'] if info['author_email'] else None
            home_page = info['home_page'] if info['home_page'] else None
            project_url = info['project_url'] if info['project_url'] else None
            requires_dist = info['requires_dist'] if info['requires_dist'] else None
            keywords = info['keywords'].replace(' ', '').split(',') if info['keywords'] else None

            author_email = re.match(r'<([^>]+)>', author_email) if '<' in author_email else author_email
            print('EMAIL: ', author_email)

            result['information']['name'] = name
            result['information']['version'] = version
            result['information']['author'] = author
            result['information']['author_email'] = author_email
            result['information']['home_page'] = home_page
            result['information']['keywords'] = keywords
            result['information']['project_url'] = project_url
            #result['information']['author'] = author
            print('DEPENDENCIES: ', requires_dist)
            if requires_dist:
                for dependency in requires_dist:
                    dependency_result = {}
                    print("DEPEN ", dependency)
                    dependency = dependency.split(';') if ';' in dependency else dependency.split(' ')
                    dependency_name = dependency[0].split(' ')[0] if '(' in dependency[0] else dependency[0].replace(' ', '') or None
                    dependency_name = dependency_name.split('=') if '=' in dependency_name else dependency_name
                    if type(dependency_name) == list:
                        dependency_name = dependency_name[0].replace('>', '').replace('<', '')
                    dependency_name = dependency_name.replace('~', '')
                    dependency_name = dependency_name.split('[')[0] if '[' in dependency_name else dependency_name

                    #if dependency_name in self.visited_packages:
                    #    print('*******FINISH*******')
                    #    exit(0)
                    #if not dependency_name or dependency_name in self.visited_packages:
                    #    continue

                    dependency_version = None
                    if len(dependency) > 1:
                        dependency_version = dependency[1] or None
                        print(dependency_version, " ++++")
                        version_match = re.search(r'\d+(\.\d+)+', dependency_version)
                        if version_match:
                            print('VERSION MATCHED')
                            dependency_version = dependency_version[version_match.start():version_match.end()]
                    print(f'DEPENDENCY: {dependency_name}:{dependency_version}')

                    purl_object = PackageURL(type='pypi', name=dependency_name, version=dependency_version)
                    bom_ref = purl_object.to_string() if False else None
                    component = Component(name=name, bom_ref=bom_ref, version=version, purl=purl_object)

                    print('\n\n\nADD VISITED: ', dependency_name, '\n\n')
                    self.visited_packages.add(dependency_name)

                    fetch_info = self.fetchPyPi(name=dependency_name, version=dependency_version)
                    if fetch_info:
                        print('FETCH_INFO DRIN')
                        print(fetch_info['dependencies'])
                        if fetch_info['dependencies']:
                            component.dependencies.update(fetch_info['dependencies'])
                        component.purl = purl_object

                        result['dependencies'].append(component)
                        print(result)
                        print('INNER ______________________')
                        #exit(0)

            return result
        return None
