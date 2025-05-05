import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

interface Hospital {
  id: string;
  name: string;
  lat: number;
  lon: number;
  distance?: number;
}

const NearbyHospitals: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    const fetchHospitals = async (latitude: number, longitude: number) => {
      setUserLocation([latitude, longitude]);

      const overpassUrl = "https://overpass-api.de/api/interpreter";
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:10000,${latitude},${longitude});
          way["amenity"="hospital"](around:10000,${latitude},${longitude});
          relation["amenity"="hospital"](around:10000,${latitude},${longitude});
        );
        out center;
      `;

      try {
        const res = await fetch(overpassUrl, {
          method: "POST",
          body: query,
        });

        const data = await res.json();

        const parsedHospitals: Hospital[] = data.elements
          .map((el: any) => {
            const lat = el.lat || el.center?.lat;
            const lon = el.lon || el.center?.lon;
            if (!lat || !lon) return null;

            return {
              id: `${el.type}-${el.id}`,
              name: el.tags?.name || "Unnamed Hospital",
              lat,
              lon,
              distance: getDistance(latitude, longitude, lat, lon),
            };
          })
          .filter(Boolean); // Remove null entries

        parsedHospitals.sort((a, b) => a!.distance! - b!.distance!);
        setHospitals(parsedHospitals);
      } catch (e) {
        console.error("Overpass API error:", e);
        setError("Failed to fetch hospital data from Overpass API.");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchHospitals(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(
            "Location access denied. Please enable location and refresh."
          );

          // Optional: fallback mock location for testing (e.g., Delhi)
          // Uncomment the next line if you'd like to test without location permission
          // fetchHospitals(28.6139, 77.2090);
        }
      );
    } else {
      setError("Geolocation not supported by your browser.");
    }
  }, []);

  if (error) {
    return <div className="text-red-600 p-4 bg-red-50 rounded">{error}</div>;
  }

  if (!userLocation) {
    return <div>Getting your location...</div>;
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center">
        <MapPin className="h-5 w-5 mr-2 text-green-600" />
        Hospitals Near You
      </h2>
      {hospitals.length === 0 ? (
        <p className="text-gray-500">No hospitals found nearby.</p>
      ) : (
        <ul className="space-y-3">
          {hospitals.map((hospital) => (
            <li
              key={hospital.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="font-medium text-lg text-gray-800">
                {hospital.name}
              </div>
              <div className="text-sm text-gray-600">
                {hospital.distance?.toFixed(2)} km away
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NearbyHospitals;
