import requests

class NVDParser:

    def __init__(self):
        ...

    def get_vulnerabilities(self, name, version):
        # A CPE Name is a string of characters comprised of 13 colon separated values that describe a product.
        # In CPEv2.3 the first two values are always “cpe” and “2.3”. The 11 values that follow are referred to as the CPE components.
        # When filtering by cpeName the part, vendor, product, and version components are REQUIRED to contain values other than "*".
        url = 'https://services.nvd.nist.gov/rest/json/cves/2.0'
        params = {
            'cpeName': f'cpe:2.3:a:{name}:{name}:{version}:*:*:*:*:*:*:*',
            "startIndex": 0,
            "resultsPerPage": 1
        }
        response = requests.get(url, params)

        # Extract the vulnerability information from the response

        print(response.status_code)
        if response.status_code == 200:
            data = response.json()
            return data['vulnerabilities']

        return []
