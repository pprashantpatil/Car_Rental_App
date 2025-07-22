import React, { useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const LocationSearchInput = ({ label, onSelect }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val) => {
    debugger;
    setValue(val, false);
    clearSuggestions();
    console.log("Status:", status, "Data:", data);

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    onSelect({ address: val, lat, lng });
  };
  useEffect(() => {
    debugger;
    console.log("Ready:", ready);
  }, []);
  return (
    <div>
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Search location"
        className="form-control"
      />
      {status === "OK" &&
        data.map(({ description }, idx) => (
          <div
            key={idx}
            className="autocomplete-suggestion"
            onClick={() => handleSelect(description)}
          >
            {description}
          </div>
        ))}
    </div>
  );
};

export default LocationSearchInput;
