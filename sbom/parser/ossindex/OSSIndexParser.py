import json
from typing import List, Optional


class ComponentReportVulnerability:
    def __init__(self):
        self.id = None
        self.title = None
        self.description = None
        self.cvss_score = None
        self.cvss_vector = None
        self.cwe = None
        self.cve = None
        self.reference = None
        self.external_references = []


class ComponentReport:
    def __init__(self):
        self.coordinates = None
        self.description = None
        self.reference = None
        self.vulnerabilities = []

    def add_vulnerability(self, vuln: ComponentReportVulnerability):
        self.vulnerabilities.append(vuln)


class OssIndexParser:
    def parse(self, json_str: str) -> List[ComponentReport]:
        json_obj = json.loads(json_str)
        component_reports = []
        for obj in json_obj:
            component_report = self.parse_component_report(obj)
            component_reports.append(component_report)
        return component_reports

    def parse_component_report(self, obj: dict) -> ComponentReport:
        component_report = ComponentReport()
        component_report.coordinates = obj.get("coordinates")
        component_report.description = obj.get("description")
        component_report.reference = obj.get("references")
        vulnerabilities = obj.get("vulnerabilities")
        for vuln_obj in vulnerabilities:
            vuln = ComponentReportVulnerability()
            vuln.id = vuln_obj.get("id")
            vuln.title = vuln_obj.get("title")
            vuln.description = vuln_obj.get("description")
            vuln.cvss_score = vuln_obj.get("cvssScore")
            vuln.cvss_vector = vuln_obj.get("cvssVector")
            vuln.cwe = vuln_obj.get("cwe")
            vuln.cve = vuln_obj.get("cve")
            vuln.reference = vuln_obj.get("reference")
            vuln.external_references = vuln_obj.get("externalReferences")
            component_report.add_vulnerability(vuln)
        return component_report
