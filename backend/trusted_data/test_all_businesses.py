from osm_test import get_nearby_businesses


businesses = [
    "Dairy",
    "Tailoring",
    "Kirana",
    "Poultry",
    "SolarGrid",
    "FlourMill",
    "Fishery",
]

latitude = 26.4499
longitude = 80.3319
radius = 5000


print("\n" + "=" * 60)
print("GraminGuru - OSM All Business Test")
print("=" * 60)

for business in businesses:

    print(f"\nTesting: {business}")
    print("-" * 40)

    result = get_nearby_businesses(
        latitude,
        longitude,
        radius,
        business
    )

    print(
        f"Direct Businesses : "
        f"{result.get('direct_business_count', 0)}"
    )

    print(
        f"Potential Retail  : "
        f"{result.get('potential_retail_count', 0)}"
    )

    print(
        f"Markets / Mandis  : "
        f"{result.get('marketplace_count', 0)}"
    )

    print(
        f"Total Mapped      : "
        f"{result.get('total_mapped_places', 0)}"
    )

    print(
        f"Confidence        : "
        f"{result.get('confidence', 'Not Available')}"
    )

print("\n" + "=" * 60)
print("ALL BUSINESS TEST COMPLETE")
print("=" * 60)