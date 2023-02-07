import os
from enum import Enum

from sbom.Controller import Controller


class CLI:
    class _OUTPUT_FORMAT(Enum):
        XML = 'xml'
        JSON = 'json'

    class _OUTPUT_FORMATS(str, Enum):
        XML = 'xml'
        JSON = 'json'

    _FILE_TYPE = [
        'requirements.txt',
        'poetry.lock',
        'Pipfile.lock',
        'package.json',
        'maven',
        'pom.xml',
        'build.gradle',
        'build.sbt',
        'ivy.xml',
    ]

    _SOURCE_TYPE = [
        ('requirements.txt', 'pypi'),
        ('poetry.lock', 'pypi'),
        ('Pipfile.lock', 'pypi'),
        ('package.json', 'npm'),
        ('pom.xml', 'maven'),
        ('build.gradle', 'maven'),
        ('build.sbt', 'maven'),
        ('ivy.xml', 'maven'),
    ]

    _SOURCE_TYPE_DICT = {
        'NPM': [
            'package.json'
        ],
        'PYPI': [
            'requirements.txt',
            'poetry.lock',
            'Pipfile.lock',
        ],
        'MAVEN': [
            'pom.xml',
            'build.gradle',
            'build.sbt',
            'ivy.xml',
        ],
    }

    def __init__(self, directory: str = None):
        if not directory:
            raise Exception()

        self.directory = directory
        self.source_files = []

    def parse(self):
        self.scanner()

        # should do an API-Call to the backend and should send parsed package information instead of whole file contents
        return Controller(source='cli_client', source_files=self.source_files)

    def scanner(self) -> list:
        """
        the scanner method from the cli client-application (for testing purpose)

        :param :
        :return :
        """
        files = []

        self.traverse_directory(self.directory)
        self.source_files = list(dict.fromkeys(self.source_files))  # remove redundant files

        for source in self.source_files:
            open_source = open(source[0], 'r')
            with open_source:
                try:
                    files.append((open_source.read(), source[1]))
                except Exception as ex:
                    print(ex)
            open_source.close()

        self.source_files = files

        #nvd_parser = NVDParser()
        #for component in components:
        #    if component is not None:
        #        comp = component.toJSON()
        #        vulnerabilities += nvd_parser.get_vulnerabilities(comp['name'], comp['version'])

    def traverse_directory(self, root_dir):
        for path, dirs, files in os.walk(root_dir):
            for file in files:
                if file in self._FILE_TYPE:
                    self.source_files.append((os.path.join(path, file), 'npm' if file in self._SOURCE_TYPE_DICT['NPM']
                    else 'pypi' if file in self._SOURCE_TYPE_DICT['PYPI']
                    else 'maven' if file in self._SOURCE_TYPE_DICT['MAVEN'] else None))

            for subdir in dirs:
                self.traverse_directory(os.path.join(path, subdir))
