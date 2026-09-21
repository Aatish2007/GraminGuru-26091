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

targets = [
    "fetchMarkets(",
    "fetchMarkets",
    ".Ay(",
]

for target in targets:

    print("\n" + "=" * 80)
    print("SEARCHING:", target)
    print("=" * 80)

    positions = [
        match.start()
        for match in re.finditer(re.escape(target), javascript)
    ]

    print("Occurrences:", len(positions))

    for position in positions[:15]:

        start = max(0, position - 4000)
        end = min(len(javascript), position + 5000)

        print("\n--- JavaScript around occurrence ---\n")
        print(javascript[start:end])

print("\n" + "=" * 80)
print("Inspection completed.")