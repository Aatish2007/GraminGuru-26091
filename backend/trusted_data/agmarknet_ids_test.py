import requests

BASE_URL = "https://api.agmarknet.gov.in/v1"

headers = {
    "User-Agent": "GraminGuru/1.0 (SIH2026 educational project)",
    "Content-Type": "application/json"
}

url = BASE_URL + "/list-state"

try:
    response = requests.post(
        url,
        json={},
        headers=headers,
        timeout=30
    )

    print("Status Code:", response.status_code)
    print("Content Type:", response.headers.get("content-type"))
    print("Response Size:", len(response.content))

    print("\nResponse:")
    print(response.text[:5000])

except requests.RequestException as error:
    print("API request failed.")
    print("Error:", error)