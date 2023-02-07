from enum import Enum
import os
import sys
from datetime import datetime
from typing import Any

from sbom.parser.java.POMParser import POMParser
from sbom.parser.python.RequirementsParser import RequirementsParser
from sbom.parser.python.EnvironmentParser import EnvironmentParser
from sbom.parser.python.PoetryParser import PoetryParser
from sbom.parser.python.CondaParser import CondaListExplicitParser, CondaListJsonParser
from sbom.parser.python.PipEnvParser import PipEnvParser
from sbom.fetcher.GitHub import GitHub

from sbom.parser.node.NPMPackageParser import NPMPackageParser
from cyclonedx.model.component import Component

from sbom.vulnerabilities.NVDParser import NVDParser


class CycloneDxCmdException(Exception):
    pass


class CycloneDxCmdNoInputFileSupplied(CycloneDxCmdException):
    pass


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


class Controller:
    def __init__(self, source: str = None, **kwargs):
        if source is None:
            raise Exception()

        self.parser = 'requirements'
        self.input_source = None
        self._DEBUG_ENABLED = False
        self.parsed_components = []
        self.source_files = []
        self.source = source
        if source == 'web_client' and kwargs.get('url'):
            self.url = kwargs.get('url')
        elif source == 'cli_client' and kwargs.get('source_files'):
            self.source_files = kwargs.get('source_files')
        else:
            raise Exception('Wrong Client ID')

        self.run()

    def run(self) -> None:
        if self.source == 'web_client':
            repo = GitHub(self.url)
            self.source_files = repo.traverse_repo()
        elif self.source == 'cli_client':
            for file in self.source_files:
                if file[1] == 'pypi':  # TODO: only support for python for now
                    self.parsed_components += self.parse(input_data=file[0], package_manager=file[1]).get_components()

    def parse(self, input_data, package_manager: str = None):
        if package_manager is None:
            raise Exception('package_manager should not be None')
        dependency_source = 'requirements'  # TODO: hardcoded only support for requirements.*.txt files
        input = None
        use_purl_bom_ref = False

        if False and dependency_source == 'input_from_environment':
            return EnvironmentParser(use_purl_bom_ref=use_purl_bom_ref,
                debug_message=lambda m, *a, **k: self._debug_message(f'EnvironmentParser {m}', *a, **k))

        if False and not dependency_source == 'input_source':
            # Nothing passed via STDIN, and no FILENAME supplied, let's assume a default by input type for ease
            current_directory = os.getcwd()
            try:
                if dependency_source == 'input_from_conda_explicit':
                    raise CycloneDxCmdNoInputFileSupplied(
                        'When using input from Conda Explicit, you need to pipe input via STDIN')
                elif dependency_source == 'input_from_conda_json':
                    raise CycloneDxCmdNoInputFileSupplied(
                        'When using input from Conda JSON, you need to pipe input via STDIN')
                elif dependency_source == 'input_from_pip':
                    input = open(os.path.join(current_directory, 'Pipfile.lock'), 'r')
                elif dependency_source == 'input_from_poetry':
                    input = open(os.path.join(current_directory, 'poetry.lock'), 'r')
                elif dependency_source == 'input_from_requirements':
                    input = open(os.path.join(current_directory, 'requirements.txt'), 'r')
                else:
                    raise CycloneDxCmdException('Parser type could not be determined.')
            except FileNotFoundError as error:
                raise CycloneDxCmdNoInputFileSupplied(
                    f'No input file was supplied and no input was provided on STDIN:\n{str(error)}'
                ) from error

        #input_data_fh = input
        #with input_data_fh:
        #    input_data = input_data_fh.read()
        #    input_data_fh.close()
        if package_manager == 'pypi':
            if dependency_source == 'input_from_conda_explicit':
                return CondaListExplicitParser(
                    conda_data=input_data,
                    use_purl_bom_ref=use_purl_bom_ref,
                    debug_message=lambda m, *a, **k: self._debug_message(f'CondaListExplicitParser {m}', *a, **k)
                )
            elif dependency_source == 'input_from_conda_json':
                return CondaListJsonParser(
                    conda_data=input_data,
                    use_purl_bom_ref=use_purl_bom_ref,
                    debug_message=lambda m, *a, **k: self._debug_message(f'CondaListJsonParser {m}', *a, **k)
                )
            elif dependency_source == 'input_from_pip':
                return PipEnvParser(
                    pipenv_contents=input_data,
                    use_purl_bom_ref=use_purl_bom_ref,
                    debug_message=lambda m, *a, **k: self._debug_message(f'PipEnvParser {m}', *a, **k)
                )
            elif dependency_source == 'input_from_poetry':
                return PoetryParser(
                    poetry_lock_contents=input_data,
                    use_purl_bom_ref=use_purl_bom_ref,
                    debug_message=lambda m, *a, **k: self._debug_message(f'PoetryParser {m}', *a, **k)
                )
            elif dependency_source == 'requirements':
                return RequirementsParser(
                    requirements_content=input_data,
                    use_purl_bom_ref=use_purl_bom_ref,
                    debug_message=lambda m, *a, **k: self._debug_message(f'RequirementsParser {m}', *a, **k)
                )
            else:
                raise CycloneDxCmdException('Parser type could not be determined.')
        elif package_manager == 'npm':
            import json
            if dependency_source == 'package':
                return NPMPackageParser(
                    data=json.loads(input_data),
                    use_purl_bom_ref=use_purl_bom_ref,
                    debug_message=lambda m, *a, **k: self._debug_message(f'NodePackageParser {m}', *a, **k)
                )
        elif package_manager == 'maven':
            if dependency_source == 'pom':
                return POMParser(
                    data=input_data,
                    use_purl_bom_ref=use_purl_bom_ref,
                    debug_message=lambda m, *a, **k: self._debug_message(f'NodePackageParser {m}', *a, **k)
                )

    def _debug_message(self, message: str, *args: Any, **kwargs: Any) -> None:
        if self._DEBUG_ENABLED:
            print(f'[DEBUG] - {{__t}} - {message}'.format(*args, **kwargs, __t=datetime.now()),
                  file=sys.stderr)

    def get_data(self, serialize: bool = False) -> list:
        result = []
        for parser in self.parsed_components:
            import jsonpickle
            import json

            component = jsonpickle.encode(parser)
            json_dict = json.loads(component)
            json_dict = {k.lstrip('_'): v for k, v in json_dict.items()}
            component = json_dict
            #print(json_string)
            result.append(component)

        return result



#In case you are using npm package manager and your dependencies are in devDependencies then you can access them using data['devDependencies']
#You can also use the requests library to fetch package.json from npm registry, and parse it

#import requests

#response = requests.get("https://registry.npmjs.org/{PACKAGE_NAME}")
#data = response.json()
#dependencies = data["versions"][data["dist-tags"]["latest"]]["dependencies"]
#for package, version in dependencies.items():
#  print(f'{package}: {version}')
