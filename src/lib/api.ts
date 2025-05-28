const BASEROW_TOKEN = "GG7ry1f2aIvv35TeB3huzyOk6kTb25vY";
const TABLE_ID = "550560";

export interface Prayer {
  id: number;
  "Nama Doa": string;
  "Lafadz Doa": string;
  "Arti Doa": string;
}

export async function fetchPrayers(): Promise<Prayer[]> {
  try {
    const response = await fetch(
      `https://api.baserow.io/api/database/rows/table/${TABLE_ID}/?user_field_names=true`,
      {
        headers: {
          Authorization: `Token ${BASEROW_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching prayers: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch prayers:", error);
    return [];
  }
}

export async function fetchPrayerById(id: number): Promise<Prayer | null> {
  try {
    const prayers = await fetchPrayers();
    return prayers.find((prayer) => prayer.id === id) || null;
  } catch (error) {
    console.error(`Failed to fetch prayer with id ${id}:`, error);
    return null;
  }
}
