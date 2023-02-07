import json

from flask import Flask, Response, request
from flask_cors import CORS

from sbom.CLI import CLI
from sbom.Controller import Controller


app = Flask(__name__)
CORS(app)


def run():
    app.run()


@app.route("/", methods=['POST'])
def create_sbom():
    if True:
        print(request.get_json())
        #controller = Controller(source=request.get_json()['source'], url=request.get_json()['url'])
        #sbom_result = controller.scanner()
        #print(sbom_result)

        import os
        result = CLI(directory=os.getcwd()).parse().get_data()
        #print(result)
        #print(json.loads(result[0])['name'])
        print('DONE')

        return Response(json.dumps(result))
    else:
        import os
        #cli = CLI(directory=os.getcwd())
        #print(cli)

        result = [
            {
                'id': 1,
                'name': 'cyclone-dx',
                'version': '5.2.2',
                'license': 'MIT',
                'proprietary_license': False,
                'package_size': '478',
                'risk_level': 2,
                'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                'web_link': 'https://cyclonedx.org/',
                'nested_components': [
                    {
                        'id': 1,
                        'name': 'nununu',
                        'version': '5.2.2',
                        'license': 'MIT',
                        'proprietary_license': True,
                        'package_size': '478',
                        'risk_level': 3,
                        'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                        'web_link': 'https://cyclonedx.org/',
                        'nested_components': [
                            {
                                'id': 1,
                                'name': 'cyclone-dx',
                                'version': '5.2.2',
                                'license': 'MIT',
                                'proprietary_license': False,
                                'package_size': '478',
                                'risk_level': 2,
                                'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                                'web_link': 'https://cyclonedx.org/',
                                'nested_components': [
                                    {
                                        'id': 1,
                                        'name': 'cyclone-dx',
                                        'version': '5.2.2',
                                        'license': 'MIT',
                                        'proprietary_license': False,
                                        'package_size': '478',
                                        'risk_level': 2,
                                        'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                                        'web_link': 'https://cyclonedx.org/',
                                        'nested_components': [
                                            {
                                                'id': 1,
                                                'name': 'cyclone-dx',
                                                'version': '5.2.2',
                                                'license': 'MIT',
                                                'proprietary_license': False,
                                                'package_size': '478',
                                                'risk_level': 2,
                                                'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                                                'web_link': 'https://cyclonedx.org/',
                                                'nested_components': None
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                'id': 2,
                'name': 'axios',
                'version': '5.2.2',
                'license': 'MIT',
                'proprietary_license': True,
                'package_size': '478',
                'risk_level': 0,
                'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                'web_link': 'https://cyclonedx.org/',
                'nested_components': []
            },
            {
                'id': 3,
                'name': 'django',
                'version': '5.2.2',
                'license': 'MIT',
                'proprietary_license': True,
                'package_size': '478',
                'risk_level': 0,
                'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                'web_link': 'https://cyclonedx.org/',
                'nested_components': []
            },
            {
                'id': 4,
                'name': 'rest-framework',
                'version': '5.2.2',
                'license': 'MIT',
                'proprietary_license': True,
                'package_size': '478',
                'risk_level': 0,
                'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                'web_link': 'https://cyclonedx.org/',
                'nested_components': []
            },
            {
                'id': 5,
                'name': 'qubix',
                'version': '5.2.2',
                'license': 'MIT',
                'proprietary_license': True,
                'package_size': '478',
                'risk_level': 0,
                'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                'web_link': 'https://cyclonedx.org/',
                'nested_components': []
            },
            {
                'id': 6,
                'name': 'horma',
                'version': '5.2.2',
                'license': 'MIT',
                'proprietary_license': True,
                'package_size': '478',
                'risk_level': 0,
                'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                'web_link': 'https://cyclonedx.org/',
                'nested_components': []
            },
            {
                'id': 7,
                'name': 'PyParser',
                'version': '5.2.2',
                'license': 'MIT',
                'proprietary_license': True,
                'package_size': '478',
                'risk_level': 0,
                'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                'web_link': 'https://cyclonedx.org/',
                'nested_components': []
            },
            {
                'id': 8,
                'name': 'Tester',
                'version': '5.2.2',
                'license': 'MIT',
                'proprietary_license': True,
                'package_size': '478',
                'risk_level': 0,
                'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                'web_link': 'https://cyclonedx.org/',
                'nested_components': []
            },
            {
                'id': 9,
                'name': 'SPDXler',
                'version': '5.2.2',
                'license': 'MIT',
                'proprietary_license': True,
                'package_size': '478',
                'risk_level': 0,
                'repository_link': 'https://github.com/CycloneDX/cyclonedx-node-module.git',
                'web_link': 'https://cyclonedx.org/',
                'nested_components': []
            }
        ]
        return result
    return Response(status=404, mimetype='plain/text')


