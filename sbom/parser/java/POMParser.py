import xml.etree.ElementTree as ET
import re


from ...model.component import Component, HashType
from .. import BaseParser, ParserWarning

from packageurl import PackageURL  # type: ignore
from pip_requirements_parser import RequirementsFile  # type: ignore
from .._debug import DebugMessageCallback, quiet


class POMParser(BaseParser):
    def __init__(self, data: str, use_purl_bom_ref: bool = False, *,
                 debug_message: DebugMessageCallback = quiet) -> None:
        super().__init__()
        debug_message('init {}', self.__class__.__name__)
        data = re.sub(r'<project\s+[^>]+>', '<project>', data)

        root = ET.fromstring(data)

        for dependency in root.iter("dependency"):
            group_id = dependency.find("groupId").text
            artifact_id = dependency.find("artifactId").text
            version = dependency.find("version").text
            print(f'{group_id}:{artifact_id}:{version}')

            purl = PackageURL(type='maven', name=f"{group_id}:{artifact_id}", version=version)
            print(purl)
            bom_ref = purl.to_string() if use_purl_bom_ref else None
            component = Component(name=f"{group_id}:{artifact_id}", bom_ref=bom_ref, version=version, purl=purl)
            from ...fetcher.Fetcher import Fetcher
            fetch_info = Fetcher().fetchMaven(group_id=group_id, artifact_id=artifact_id, version=version)
            print(fetch_info)

            self._components.append(component)

