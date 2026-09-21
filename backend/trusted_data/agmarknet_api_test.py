import requests


BASE_URL = "https://api.agmarknet.gov.in/v1"


HEADERS = {
    "User-Agent":
        "GraminGuru/1.0 (SIH2026 educational project)"
}


STATE_IDS = {

    "Andhra Pradesh": 2,
    "Arunachal Pradesh": 3,
    "Assam": 4,
    "Bihar": 5,
    "Chandigarh": 6,
    "Chattisgarh": 7,
    "Dadra and Nagar Haveli": 8,
    "Daman and Diu": 9,
    "Goa": 10,
    "Gujarat": 11,
    "Haryana": 12,
    "Himachal Pradesh": 13,
    "Jammu and Kashmir": 14,
    "Jharkhand": 15,
    "Karnataka": 16,
    "Keralam": 17,
    "Lakshadweep": 18,
    "Madhya Pradesh":19,
    "Maharashtra": 20,
    "Manipur": 21,
    "Meghalaya": 22,
    "Mizoram": 23,
    "Nagaland": 24,
    "NCT of Delhi": 25,
    "Odisha": 26,
    "Pondicherry": 27,
    "Rajasthan": 29,
    "Sikkim": 30,
    "Tamil Nadu": 31,
    "Telangana": 32,
    "Tripura": 33,
    "Uttar Pradesh": 34,
    "Uttarakhand": 35,
    "West Bengal": 36,
    "N/A": 37
}


def get_market_data(
    state_id,
    date
):

    url = (
        f"{BASE_URL}/"
        "prices-and-arrivals/"
        "commodity-wise/"
        "daily-report-state"
    )

    params = {

        "date": date,

        "stateIds": state_id,

        "includeExcel": "false"
    }

    try:

        print(
            "\n[AGMARKNET] Request:",
            date,
            "State:",
            state_id
        )

        response = requests.get(
            url,
            params=params,
            headers=HEADERS,
            timeout=30
        )

        print(
            "[AGMARKNET] HTTP:",
            response.status_code
        )

        if response.status_code != 200:

            print(
                response.text[:500]
            )

            return {

                "success": False,

                "markets": [],

                "message":
                    f"HTTP {response.status_code}"
            }

        data = response.json()

        print(
            "[AGMARKNET] Markets:",
            len(
                data.get(
                    "markets",
                    []
                )
            )
        )

        return data

    except Exception as error:

        print(
            "[AGMARKNET] ERROR:",
            error
        )

        return {

            "success": False,

            "markets": [],

            "message": str(error)
        }


def find_commodity_prices(
    data,
    commodity_name
):

    matches = []

    markets = data.get(
        "markets",
        []
    )

    target = str(
        commodity_name
    ).strip().lower()


    for market in markets:

        if not isinstance(
            market,
            dict
        ):
            continue

        market_name = market.get(
            "marketName",
            "Unknown Market"
        )

        groups = market.get(
            "commodityGroups",
            []
        )

        for group in groups:

            if not isinstance(
                group,
                dict
            ):
                continue

            group_name = group.get(
                "groupName",
                ""
            )

            commodities = group.get(
                "commodities",
                []
            )

            for commodity in commodities:

                if not isinstance(
                    commodity,
                    dict
                ):
                    continue

                name = str(
                    commodity.get(
                        "commodityName",
                        ""
                    )
                )

                if target not in name.lower():
                    continue

                records = commodity.get(
                    "data",
                    []
                )

                for record in records:

                    if not isinstance(
                        record,
                        dict
                    ):
                        continue

                    matches.append({

                        "market":
                            market_name,

                        "group":
                            group_name,

                        "commodity":
                            name,

                        "arrivals":
                            record.get(
                                "arrivals"
                            ),

                        "arrival_unit":
                            record.get(
                                "unitOfArrivals"
                            ),

                        "variety":
                            record.get(
                                "variety"
                            ),

                        "minimum_price":
                            record.get(
                                "minimumPrice"
                            ),

                        "maximum_price":
                            record.get(
                                "maximumPrice"
                            ),

                        "modal_price":
                            record.get(
                                "modalPrice"
                            ),

                        "price_unit":
                            record.get(
                                "unitOfPrice"
                            )
                    })

    print(
        "[AGMARKNET] Commodity:",
        commodity_name,
        "Records:",
        len(matches)
    )

    return matches


if __name__ == "__main__":

    state_id = STATE_IDS[
        "Uttar Pradesh"
    ]

    data = get_market_data(
        state_id,
        "2025-03-15"
    )

    records = find_commodity_prices(
        data,
        "Maize"
    )

    print(
        "\nMaize records:",
        len(records)
    )

    for item in records[:10]:

        print(
            item["market"],
            "|",
            item["modal_price"],
            item["price_unit"]
        )