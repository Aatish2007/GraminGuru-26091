import requests


DATASET_URL = (
    "https://www.data.gov.in/"
    "catalog/villagetown-wise-primary-census-abstract-2011-uttar-pradesh"
)


def test_census_source():

    try:
        response = requests.get(
            DATASET_URL,
            timeout=15
        )

        print("Status Code:", response.status_code)

        if response.status_code == 200:
            print("Census source is reachable.")
            print("Source: Census 2011 — data.gov.in")
            return True

        print("Census source returned an unexpected status.")
        return False

    except requests.RequestException as error:

        print("Census source connection failed.")
        print("Error:", error)
        return False


if __name__ == "__main__":
    test_census_source()