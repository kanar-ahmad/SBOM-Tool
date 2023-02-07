import csv
import logging
from decimal import Decimal

logger = logging.getLogger(__name__)


def parse(file):
    if not file.name.endswith(".csv"):
        return

    logger.info(f"Parsing {file.name}")

    with open(file) as f:
        reader = csv.reader(f)
        for values in reader:
            if values[0].startswith("CVE-"):
                cve_id = values[0]
                epss_score = Decimal(values[1])
                percentile = Decimal(values[2])

                # QueryManager and database logic would go here
                # if vuln is not None:
                #     vuln.epss_score = epss_score
                #     vuln.epss_percentile = percentile
                #     qm.persist(vuln)
