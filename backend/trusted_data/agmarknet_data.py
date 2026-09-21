import requests

AGMARKNET_URL = "https://agmarknet.gov.in/"

def test_agmarknet_data():

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
        print("Content Type:", response.headers.get("content-type"))
        print("Response Size:", len(response.content), "bytes")

        if response.status_code != 200:
            print("Agmarknet request failed.")
            return False

        text = response.text

        print("\nAgmarknet page received successfully.")

        # Check for common market-data terms
        keywords = [
            "commodity",
            "market",
            "price",
            "arrival",
            "mandi"
        ]

        print("\nChecking for market-data terms:")

        for keyword in keywords:
            if keyword.lower() in text.lower():
                print(f"✓ {keyword}")
            else:
                print(f"✗ {keyword}")

        print("\nFirst 1000 characters of response:")
        print(text[:1000])

        print("\nAgmarknet data-source inspection completed.")

        return True

    except requests.RequestException as error:

        print("Agmarknet request failed.")
        print("Error:", error)

        return False


if __name__ == "__main__":
    test_agmarknet_data()