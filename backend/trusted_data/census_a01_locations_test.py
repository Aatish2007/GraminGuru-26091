import openpyxl
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent

EXCEL_FILE = (
    BASE_DIR /
    "A-1_NO_OF_VILLAGES_TOWNS_HOUSEHOLDS_POPULATION_AND_AREA.xlsx"
)


def load_census_data():
    workbook = openpyxl.load_workbook(
        EXCEL_FILE,
        data_only=True
    )

    sheet = workbook.active

    rows = list(sheet.iter_rows(values_only=True))

    # A-01 data starts after the multi-row header
    return rows[4:]


def get_location_data(location_name):
    data = load_census_data()

    matches = []

    for row in data:

        if len(row) < 15:
            continue

        state_code = row[0]
        district_code = row[1]
        sub_district_code = row[2]
        name = row[4]
        residence_type = row[5]

        if not name:
            continue

        # District-level TOTAL record
        if (
            str(name).strip().lower() == location_name.strip().lower()
            and str(sub_district_code) == "00000"
            and str(residence_type).strip().lower() == "total"
        ):

            matches.append({
                "location": str(name),
                "state_code": str(state_code),
                "district_code": str(district_code),
                "population": int(row[10]),
                "male": int(row[11]),
                "female": int(row[12]),
                "households": int(row[9]),
                "villages": int(row[6]),
                "towns": int(row[8]),
                "area_sq_km": float(row[13]),
                "population_density": float(row[14])
            })

    return matches


def get_all_districts():
    data = load_census_data()

    districts = []

    for row in data:

        if len(row) < 15:
            continue

        state_code = row[0]
        district_code = row[1]
        sub_district_code = row[2]
        name = row[4]
        residence_type = row[5]

        if (
            name
            and str(sub_district_code) == "00000"
            and str(residence_type).strip().lower() == "total"
        ):

            districts.append({
                "location": str(name),
                "state_code": str(state_code),
                "district_code": str(district_code),
                "population": int(row[10]),
                "households": int(row[9]),
                "villages": int(row[6]),
                "towns": int(row[8]),
                "area_sq_km": float(row[13]),
                "population_density": float(row[14])
            })

    return districts


if __name__ == "__main__":

    print("Official Census A-01 Dataset")
    print("=" * 60)

    # Show how many district-level locations are available
    districts = get_all_districts()

    print("Total district-level records:", len(districts))

    print("\nFirst 20 available locations:\n")

    for district in districts[:20]:

        print(
            f"{district['location']} | "
            f"State: {district['state_code']} | "
            f"District: {district['district_code']} | "
            f"Population: {district['population']}"
        )

    print("\n" + "=" * 60)

    # Interactive search
    location = input(
        "\nEnter a district/location name to search: "
    ).strip()

    results = get_location_data(location)

    if not results:

        print(f"\nNo district-level match found for: {location}")

    else:

        print(f"\nFound {len(results)} matching record(s):")

        for result in results:

            print("\n✓", result["location"])
            print("  State Code:", result["state_code"])
            print("  District Code:", result["district_code"])
            print("  Population:", result["population"])
            print("  Households:", result["households"])
            print("  Villages:", result["villages"])
            print("  Towns:", result["towns"])
            print("  Area:", result["area_sq_km"], "sq km")
            print(
                "  Population Density:",
                result["population_density"]
            )

    print("\n" + "=" * 60)
    print("Dynamic Census search completed.")