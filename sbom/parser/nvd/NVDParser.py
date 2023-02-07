import json
from typing import Any, Optional, List
from datetime import datetime

class Vulnerability:
    def __init__(self):
        self.source = None
        self.vuln_id = None
        self.published = None
        self.updated = None
        self.description = None
        self.severity = None
        self.cwe = None
        self.cpe = None

class NvdParser:
    def parse(self, file: str) -> None:
        if not file.endswith(".json"):
            return
        print(f"Parsing {file}")
        with open(file, 'r') as f:
            json_obj = json.loads(f.read())
            cve_items = json_obj["CVE_Items"]
            for c in cve_items:
                cve_item = c
                vulnerability = Vulnerability()
                vulnerability.source = "NVD"
                cve = cve_item["cve"]
                meta0 = cve["CVE_data_meta"]
                meta1 = meta0["ID"]
                vulnerability.vuln_id = meta1
                published_date_string = cve_item["publishedDate"]
                last_modified_date_string = cve_item["lastModifiedDate"]
                try:
                    if published_date_string:
                        vulnerability.published = datetime.strptime(published_date_string, '%Y-%m-%dT%H:%M:%SZ')
                    if last_modified_date_string:
                        vulnerability.updated = datetime.strptime(last_modified_date_string, '%Y-%m-%dT%H:%M:%SZ')
                except:
                    print("Unable to parse dates from NVD data feed")
                desc_o = cve["description"]
                desc1 = desc_o["description_data"]
                description_builder = ""
                for j in range(len(desc1)):
                    desc = desc1[j]
                    description_builder += desc["value"]
                vulnerability.description = description_builder
                cvss = cve_item["impact"]["baseMetricV2"]["cvssV2"]
                #severity = us.springett.cvss.Cvss(cvss["version"], cvss["vectorString"]).severity()
                #vulnerability.severity = severity
                cwe = cve_item["problemtype"]["problemtype_data"][0]["description"][0]["value"]
                vulnerability.cwe = cwe
                cpe_matching = cve_item["configurations"]["nodes"]
                cpe_list = []
                for cpe_match in cpe_matching:
                    cpe_list.append(cpe_match["cpe_match"])
                vulnerability.cpe = cpe_list
                print(vulnerability.__dict__)
