import requests
import re

BASE_URL = "https://agmarknet.gov.in"
JS_URL = BASE_URL + "/static/js/main.9bdd0f6c.js"

headers = {
    "User-Agent": "GraminGuru/1.0 (SIH2026 educational project)"
}

response = requests.get(
    JS_URL,
    headers=headers,
    timeout=30
)

if response.status_code != 200:
    print("Could not download JavaScript bundle.")
    raise SystemExit

javascript = response.text

for target in ["r.Az(", ".Az(", "Az("]:

    print("\n" + "=" * 80)
    print("SEARCHING:", target)
    print("=" * 80)

    positions = [
        match.start()
        for match in re.finditer(re.escape(target), javascript)
    ]

    print("Occurrences:", len(positions))

    for position in positions[:10]:

        start = max(0, position - 3000)
        end = min(len(javascript), position + 4000)

        print("\n--- JavaScript around call ---\n")
        print(javascript[start:end])

print("\n" + "=" * 80)
print("Inspection completed.")