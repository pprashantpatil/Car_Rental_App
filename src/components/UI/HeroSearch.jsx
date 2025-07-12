import React, { useState } from "react";
import "../../styles/HeroSearch.css";
import DateTimePicker from "../../components/UI/DateTimePicker";
import { useNavigate } from "react-router-dom";
import bengaluru from "../../../src/assets/icons/bengaluru.png";
import mumbai from "../../../src/assets/icons/mumbai.png";
import delhi from "../../../src/assets/icons/delhi.png";
import hyderabad from "../../../src/assets/icons/hyderabad.png";
import jaipur from "../../../src/assets/icons/jaipur.png";
import pune from "../../../src/assets/icons/delhi.png";
import Cochin from "../../../src/assets/icons/delhi.png";

const cityImages = {
  bengaluru: bengaluru,
  mumbai: mumbai,
  delhi: delhi,
  hyderabad: hyderabad,
  jaipur: jaipur,
  pune: pune,
  cochin: Cochin,
};
const popularCities = [
  "Delhi",
  "Bengaluru",
  "Mumbai",
  "Pune",
  "Jaipur",
  "Hyderabad",
  "Cochin",
];

const otherCities = [
  "Ahmedabad",
  "Amritsar",
  "Chandigarh",
  "Chennai",
  "Dehradun",
  "Goa",
  "Haridwar",
  "Jodhpur",
  "Kolkata",
  "Lucknow",
  "Rishikesh",
  "Udaipur",
  "Vadodara",
  "GandhiNagar",
  "Rajkot",
];

export default function HeroSearch() {
  const navigate = useNavigate();

  const [activeCity, setActiveCity] = useState("Pune");
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [pickupDateTime, setPickupDateTime] = useState(new Date());
  const [returnDateTime, setReturnDateTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [activeField, setActiveField] = useState(null); // or 'pickup' | 'return'

  return (
    <section className="hero-wrapper">
      {/* ── search bar ───────────────── */}
      <div className="search-header">
        <div
          className="search-item"
          onClick={() => setShowCitySelector(!showCitySelector)} // 👈 toggle on click
          style={{ cursor: "pointer" }}
        >
          <label>Location</label>
          <span className="value">
            {activeCity} <span className="caret">⌄</span>
          </span>
        </div>
        <div className="search-header">
          <div
            onClick={() => {
              setShowPicker(true);
              setActiveField("pickup");
            }}
            className="search-item"
          >
            <label>Pick-Up Date & Time</label>
            <span className="value">
              {pickupDateTime.toLocaleDateString()}{" "}
              {pickupDateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div
            onClick={() => {
              setShowPicker(true);
              setActiveField("return");
            }}
            className="search-item"
          >
            <label>Return Date & Time</label>
            <span className="value">
              {returnDateTime.toLocaleDateString()}{" "}
              {returnDateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {showPicker && (
            <DateTimePicker
              selectedDateTime={
                activeField === "pickup" ? pickupDateTime : returnDateTime
              }
              onSave={(newDate) => {
                if (activeField === "pickup") {
                  setPickupDateTime(newDate);
                } else if (activeField === "return") {
                  setReturnDateTime(newDate);
                }
                setShowPicker(false);
                setActiveField(null);
              }}
              onClose={() => {
                setShowPicker(false);
                setActiveField(null);
              }}
            />
          )}
        </div>

        <button onClick={() => navigate("/cars")} className="search-btn">
          Search
        </button>
      </div>

      {/* ── toggleable city selection ───────────── */}
      {showCitySelector && (
        <>
          <h4 className="section-title">Popular Cities</h4>
          <div className="popular-list">
            {popularCities.map((city) => (
              <div
                key={city}
                className={"city-card" + (city === activeCity ? " active" : "")}
                onClick={() => {
                  setActiveCity(city);
                  setShowCitySelector(false); // ⛔ auto-close after selection
                }}
              >
                <img
                  src={cityImages[city.toLowerCase()]}
                  alt={city}
                  className="city-icon"
                />

                <span className="city-label">{city}</span>
              </div>
            ))}
          </div>

          <h4 className="section-title mt">Other Cities</h4>
          <div className="other-cities">
            {otherCities.map((city) => (
              <span
                key={city}
                className="other-city"
                onClick={() => {
                  setActiveCity(city);
                  setShowCitySelector(false);
                }}
                style={{ cursor: "pointer" }}
              >
                {city}
              </span>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
