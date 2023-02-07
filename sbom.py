from flask import Flask, Response, request
from flask_cors import CORS

import cyclonedx
from cyclonedx_py.parser.environment import EnvironmentParser
from packageurl import PackageURL  # type: ignore
from pkg_resources import DistInfoDistribution  # type: ignore


import sys


if sys.version_info >= (3, 8):
    if sys.version_info >= (3, 10):
        from importlib.metadata import PackageMetadata as _MetadataReturn
    else:
        from email.message import Message as _MetadataReturn
    from importlib.metadata import metadata
# else:
#    from importlib_metadata import metadata, PackageMetadata as _MetadataReturn




app = Flask(__name__)
CORS(app)


@app.route("/", methods=['POST'])
def create_sbom():
    print("DRIN")
    print(request.data)
    if request.method == 'POST':
        return Response(status=200, mimetype='application/json')
    return Response(status=404, mimetype='plain/text')


def sbom():
    import pkg_resources

    i: DistInfoDistribution
    for i in iter(pkg_resources.working_set):
        purl = PackageURL(type='pypi', name=i.project_name, version=i.version)
        bom_ref = purl.to_string() if True else None
        print(bom_ref)
        package_metadata = metadata(i.project_name)

        #if 'Author' in package_metadata:
        #    c.author = package_metadata['Author']

        #if 'License' in package_metadata and package_metadata['License'] != 'UNKNOWN':
        #c = Component(name=i.project_name, bom_ref=bom_ref, version=i.version, purl=purl)


def newSBOM():

    # Set up the SBOM builder
    builder = cyclonedx.BomBuilder(schema_version=cyclonedx.DEFAULT_SCHEMA_VERSION)

    # Add the source code and its dependencies
    # Replace <source_code_path> with the path to the source code and <dependency_name> and <dependency_version>
    # with the name and version of each dependency
    builder.add_component(path='<source_code_path>')
    builder.add_dependency(name='<dependency_name>', version='<dependency_version>')

    # Repeat the above step for all dependencies

    # Analyze the dependencies for vulnerabilities
    vulnerability_service = cyclonedx.VulnerabilityService()
    for component in builder.components:
        vulnerabilities = vulnerability_service.get_vulnerabilities(component)
        for vulnerability in vulnerabilities:
            builder.add_vulnerability(vulnerability)

    # Generate the SBOM document
    sbom = builder.build()

    # Write the SBOM document to a file
    with open("sbom.xml", "w") as f:
        f.write(sbom)




def findDependencies():
    import re

    # Set the path to the source code
    path = '<source_code_path>'

    # Read the source code file
    with open(path, "r") as f:
        source_code = f.read()

    # Use a regular expression to search for import statements in the source code
    import_pattern_python = re.compile(r"^import\s+(\S+)")
    require_pattern = re.compile(r"^const\s+(\S+)\s+=\s+require\(['\"]([^'\"]+)['\"]\)")
    import_pattern_java = re.compile(r"^import\s+(\S+);")
    include_pattern_cplus = re.compile(r"^#include\s+[<\"]([^>\"]+)[>\"]")


    matches = import_pattern.findall(source_code)

    # Print the dependencies
    for dependency in matches:
        print(dependency)








def get_vulnerability_info(package):
    import requests
    # Send an HTTP request to the NVD API to search for vulnerabilities for the package
    # url = f'https://services.nvd.nist.gov/rest/json/cve/1.1?cpeMatch={package.name}:{package.version}' # deprecated
    url = f'https://services.nvd.nist.gov/rest/json/cves/2.0?cpeMatch={package.name}:{package.version}' # deprecated
    response = requests.get(url)

    # Extract the vulnerability information from the response
    vulnerabilities = []
    if response.status_code == 200:
        data = response.json()
    for entry in data['result']['CVE_Items']:
        vulnerability = {}
        vulnerability['id'] = entry['cve']['CVE_data_meta']['ID']
        vulnerability['description'] = entry['cve']['description']['description_data'][0]['value']
        vulnerabilities.append(vulnerability)

    return vulnerabilities




def get_license_info(package):
    import pip
    # Use pip to retrieve the package metadata
    package_metadata = pip.metadata.Metadata(package.name)

    # Extract the license information from the metadata
    license = package_metadata['License']

    return license




def scan_source_code(source_code_directory):
    import pylint
    # Create a Pylint configuration
    pylint_config = pylint.config.PylintConfig()

    # Run Pylint on the source code directory
    pylint_output = pylint.lint.Run(source_code_directory, do_exit=False, config=pylint_config)

    # Extract the package information from the Pylint output
    packages = []
    for message in pylint_output.linter.msg_status:
        if message.symbol == 'import-error':
            # The message contains the name of the package that could not be imported
            package_name = message.msg.split(' ')[-1]
            packages.append(package_name)

    return packages