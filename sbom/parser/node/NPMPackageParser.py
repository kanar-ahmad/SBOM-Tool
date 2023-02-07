import os
import os.path
from tempfile import NamedTemporaryFile  # Weak error

from ...model.component import Component, HashType
from .. import BaseParser, ParserWarning

from packageurl import PackageURL  # type: ignore
from pip_requirements_parser import RequirementsFile  # type: ignore
from .._debug import DebugMessageCallback, quiet


class NPMPackageParser(BaseParser):
    def __init__(self, data: dict, use_purl_bom_ref: bool = False, *,
                 debug_message: DebugMessageCallback = quiet) -> None:
        super().__init__()
        debug_message('init {}', self.__class__.__name__)

        if data['dependencies']:
            data = data['dependencies']
            for key in data.keys():
                name = key
                version = data[key].replace('^', '')
                purl = PackageURL(type='npm', name=name.replace('@', ''), version=version)
                bom_ref = purl.to_string() if use_purl_bom_ref else None
                component = Component(name=name, bom_ref=bom_ref, version=version, purl=purl)
                from ...fetcher.Fetcher import Fetcher
                fetch_info = Fetcher()
                fetched_info = fetch_info.fetchNPM(name, version)

                #component.licenses()

                self._components.append(component)
        elif data['devDependencies']:
            data = data['devDependencies']
            for key in data.keys():
                name = key
                version = data[key].replace('^', '')
                purl = PackageURL(type='npm', name=name.replace('@', ''), version=version)
                bom_ref = purl.to_string() if use_purl_bom_ref else None
                component = Component(name=name, bom_ref=bom_ref, version=version, purl=purl)
                from ...fetcher.Fetcher import Fetcher
                fetch_info = Fetcher()
                fetched_info = fetch_info.fetchNPM(name, version)

                #component.licenses()

                self._components.append(component)


#class RequirementsFileParser(RequirementsParser):
#    def __init__(self, requirements_file: str, use_purl_bom_ref: bool = False, *,
#                 debug_message: DebugMessageCallback = quiet) -> None:
#        super().__init__(requirements_content=requirements_file, use_purl_bom_ref=use_purl_bom_ref,
#                         debug_message=debug_message)
