[![License][license-image]][license-url]

#Software Bill of Materials Application

###This is a Software Bill of Materials application prototype, with its backend (Python) and respective frontend client (React.js)



## 

* cyclone-dx
* cyclone-dx-lib
* pkg_resources
* packageurl

* from cyclonedx.model import License, LicenseChoice
* from cyclonedx.model.component import Component
* from cyclonedx.parser import BaseParser



* use ```flask --app hello run``` to run the flask app
* to make server externally visible add ```--host=0.0.0.0```
This tells your operating system to listen on all public IPs





# CycloneDX Specification
CycloneDX is a lightweight Software Bill of Materials (SBOM) specification designed for use in application security 
contexts and supply chain component analysis.


## Introduction
Modern software is assembled using third-party and open source components, glued together in complex and unique ways,
and integrated with original code to achieve the desired functionality. An accurate inventory of all components enables
organizations to identify risk, allows for greater transparency, and enables rapid impact analysis.

CycloneDX was created for this purpose.

Strategic direction and maintenance of the specification is managed by the CycloneDX Core working group, with origins
in the [OWASP](https://owasp.org) community.


## Use Cases
The CycloneDX project maintains a [list of achievable use cases](https://cyclonedx.org/use-cases/). Examples for each
use case are provided in both XML and JSON.


## Tool Center
The [CycloneDX Tool Center](https://cyclonedx.org/tool-center/) is a community effort to establish a marketplace of 
free, open source, and proprietary tools and solutions that support the CycloneDX specification. 


## Media Types

The following media types are officially registered with IANA:

| Media Type | Format | Assignment |
| ------- | --------- | --------- |
| application/vnd.cyclonedx+xml | XML | [IANA](https://www.iana.org/assignments/media-types/application/vnd.cyclonedx+xml) |
| application/vnd.cyclonedx+json | JSON | [IANA](https://www.iana.org/assignments/media-types/application/vnd.cyclonedx+json) |

Specific versions of CycloneDX can be specified by using the version parameter. i.e. `application/vnd.cyclonedx+xml; version=1.3`.

The officially supported media type for Protocol Buffer format is `application/x.vnd.cyclonedx+protobuf`.


## Release History

| Version | Release Date |
| ------- | --------- |
| CycloneDX 1.4 | 12 January 2022 |
| CycloneDX 1.3 | 04 May 2021 |
| CycloneDX 1.2 | 26 May 2020 |
| CycloneDX 1.1 | 03 March 2019 |
| CycloneDX 1.0 | 26 March 2018 |
| Initial Prototype | 01 May 2017 |


## Related Work
[SPDX (Software Package Data Exchange)][spdx-url] is a specification that provides low-level details of components, including all files, hashes, authors, and copyrights. SPDX also defines over 300 open source license IDs. CycloneDX builds on top of the work SPDX has accomplished with license IDs, but varies greatly in its approach towards building a software bill of material specification.

[SWID (ISO/IEC 19770-2:2015)][swid-url] is used primarily to identify installed software and is the preferred format of the NVD. SWID tags are used in the National Vulnerability Database to describe vulnerable components. The CycloneDX specification compliments this work as CycloneDX documents can incorporate SWID tags and other high-level SWID metadata and optionally include entire SWID documents. Use of SWID tag ID's are useful in determining if a specific component has known vulnerabilities.

[CPE (Common Platform Enumeration)][cpe-url] is a specification that describes the vendor, name, and version for an application, operating system, or hardware device. CPE identifiers are used in the National Vulnerability Database to describe vulnerable components. The CycloneDX specification compliments this work as CycloneDX documents can easily be used to construct exact CPE identifiers that are useful in determining if a specific component has known vulnerabilities.

## Copyright & License

CycloneDX Specification is Copyright (c) OWASP Foundation. All Rights Reserved.

Permission to modify and redistribute is granted under the terms of the [Apache License 2.0][license-url]

[license-image]: https://img.shields.io/badge/license-apache%20v2-brightgreen.svg
[license-url]: https://github.com/CycloneDX/specification/blob/master/LICENSE
[spdx-url]: https://spdx.org
[swid-url]: https://www.iso.org/standard/65666.html
[cpe-url]: https://nvd.nist.gov/products/cpe
