import React, { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "./LocationMap.css";

const BANGLADESH_CENTER = [23.6850, 90.3563];
const DEFAULT_ZOOM = 7;

function ClickHandler({ onLocationSelect }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        onLocationSelect({
          lat,
          lng,
          address: data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
        });
      } catch {
        onLocationSelect({
          lat,
          lng,
          address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
        });
      }
    },
  });
  return null;
}

function FlyTo({ coords }) {
  const map = useMap();
  if (coords) {
    map.flyTo([coords.lat, coords.lng], 14);
  }
  return null;
}

const LocationMap = ({ onLocationChange }) => {
  const [pin, setPin]           = useState(null);
  const [search, setSearch]     = useState("");
  const [searching, setSearching] = useState(false);

  const handleLocationSelect = useCallback((location) => {
    setPin(location);
    if (onLocationChange) onLocationChange(location);
  }, [onLocationChange]);

  const handleSearch = async () => {
    if (!search.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&limit=1&countrycodes=bd`
      );
      const data = await res.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        handleLocationSelect({
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          address: display_name,
        });
      } else {
        alert("Location not found. Try a different search.");
      }
    } catch {
      alert("Search failed. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div>
      <div className="location-header">
        <h3>Where did this occur?</h3>
        <p>Search for an address or click the map to pin the exact location.</p>

        <div className="search-box">
          <span className="material-symbols-outlined location-icon">search</span>
          <input
            type="text"
            placeholder="Enter street address, city, or landmark"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="search-btn"
            onClick={handleSearch}
            disabled={searching}
          >
            {searching ? "..." : "Go"}
          </button>
        </div>
      </div>

      <div className="map-wrapper">
        <MapContainer
          center={BANGLADESH_CENTER}
          zoom={DEFAULT_ZOOM}
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onLocationSelect={handleLocationSelect} />
          {pin && (
            <>
              <Marker position={[pin.lat, pin.lng]} />
              <FlyTo coords={pin} />
            </>
          )}
        </MapContainer>
      </div>

      {pin && (
        <div className="selected-location">
          <span className="material-symbols-outlined">location_on</span>
          <p>{pin.address}</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;