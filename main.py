from sbom.CLI import CLI
from sbom.Controller import Controller
from sbom import api
from sbom.fetcher.GitHub import GitHub
import os


def test():
    #request = 'https://github.com/sonatype-nexus-community/ossindex-python'
    #controller = Controller(source='repository', url=request.split('github.com')[1])
    cli = CLI(directory=os.getcwd())
    import pprint
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(cli.parse().get_data())

    #controller = Controller(source='web_client', source_files=cli.parse())

    #git = GitHub()
    #git.search_repo('https://github.com/sonatype-nexus-community/ossindex-python', 'requirements')
    exit(0)

    controller = Controller()
    controller.scanner()
    exit(0)

    from packageurl import PackageURL


    import pip
    #from pypi import PyPi

    #print(pip('pyconfigurableml'))
    #print(PyPi)

    def get_package_info(package_name, package_version):
        try:
            package = package_name + '==' + package_version
            package_info = pip.get_installed_distributions(local_only=False, user_only=False)
            for package in package_info:
                if package.project_name == package_name and package.version == package_version:
                    return package.as_requirement()
        except Exception as e:
            print(e)


    package_name = "requests"
    package_version = "2.24.0"
    info = get_package_info(package_name, package_version)
    #print(info)


    #from sbom.fetcher.Fetcher import Fetcher
    #x = Fetcher()
    #x.fetchNPM()

    from ossindex.ossindex import OssIndex
    from ossindex.model import OssIndexComponent, Vulnerability
    from typing import List, Set

    o = OssIndex()
    results: List[OssIndexComponent] = o.get_component_report(packages=[
        PackageURL.from_string(purl='pkg:pypi/pip@19.2.0')
    ])

    for r in results:
        v: Vulnerability
        print(r)
        for vulnerability in r.vulnerabilities:
            print(vulnerability)
        #print("{}: {} known vulnerabilities".format(r.coordinates(), len(r.get_vulnerabilities())))
        #v: Vulnerability
        #for v in r.get_vulnerabilities():
        #    print('    - {}'.format(str(v)))




    import requests
    def check_vulnerabilities(package_name, package_version):
        url = f'https://ossindex.sonatype.org/api/v3/component-report/pkg:pypi/requests@2.24.0'
        vulnerabilities = requests.get(url).json()
        return vulnerabilities

    package_name = "requests"
    package_version = "2.24.0"
    vulnerabilities = check_vulnerabilities(package_name, package_version)
    print(vulnerabilities)


if __name__ == '__main__':
    #api.run()
    test()
