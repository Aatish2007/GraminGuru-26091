import requests

AGMARKNET_URL = "https://agmarknet.gov.in/"


def test_agmarknet():

    headers = {
        "User-Agent": "GraminGuru/1.0 (SIH2026 educational project)"
    }

    try:
        response = requests.get(
            AGMARKNET_URL,
            headers=headers,
            timeout=30
        )

        print("Status Code:", response.status_code)

        if response.status_code == 200:
            print("Agmarknet source is reachable.")
            print("Source: Agmarknet — Agricultural Market Information")
            print("\nAgmarknet connectivity test completed successfully.")
            return True

        print("Agmarknet source returned an unexpected status.")
        print(response.text[:500])
        return False

    except requests.RequestException as error:

        print("Agmarknet connection failed.")
        print("Error:", error)

        return False


if __name__ == "__main__":
    test_agmarknet()