import React, { useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import { useLoading } from "../contexts/LoadingContext";

import axios from "axios";
import API_BASE_URL from "../config";
import { toast } from "react-toastify";

const brands = [
  "Tesla",
  "Tata",
  "BMW",
  "Audi",
  "Mercedes",
  "Toyota",
  "Hyundai",
  "Kia",
];
const brandOptions = brands.map((b) => ({ value: b, label: b }));
const models = [
  "Model X",
  "X5",
  "A4",
  "E-Class",
  "Fortuner",
  "Creta",
  "Seltos",
];
const modelsOptions = models.map((b) => ({ value: b, label: b }));
const locations = ["Pune", "Mumbai", "Delhi", "Bangalore", "Hyderabad"];
const locationOptions = locations.map((b) => ({ value: b, label: b }));
const features = [
  "Sunroof",
  "Navigation",
  "Bluetooth",
  "Rear Camera",
  "Lane Assist",
  "Cruise Control",
  "Wireless Charging",
  "Ambient Lighting",
];
const featuresOptions = features.map((b) => ({ value: b, label: b }));

const AddCar = () => {
  const { showLoader, hideLoader } = useLoading();
  const [step, setStep] = useState(0);
  const [carData, setCarData] = useState({
    brand: "",
    carName: "",
    model: "",
    rating: 0,
    price: "",
    speed: "",
    gps: "Yes",
    seatType: "",
    automatic: false,
    fuelEconomy: "",
    location: "",
    description: "",
    features: [],
    images: [], // 4 images
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setCarData({ ...carData, images: files });
  };

  const handleSubmit = async () => {
    showLoader();
    const formData = new FormData();
    Object.entries(carData).forEach(([key, value]) => {
      if (key === "features") {
        formData.append("features", JSON.stringify(value)); // Send as string
      } else if (key === "images") {
        value.forEach((img) => formData.append("images", img));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const res = await axios.post(`${API_BASE_URL}/api/addcar`, formData);
      hideLoader();
      toast.success("Car added successfully!");
      alert("Car added successfully!");
    } catch (err) {
      console.error(err);
      hideLoader();
      toast.error("failed to add car");
    }
  };

  return (
    <div className="container mt-5">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="card p-4 shadow"
      >
        {step === 0 && (
          <>
            <h4>📝 Car Basic Info</h4>
            <Select
              placeholder="Select Brand"
              options={brandOptions}
              className="my-2"
              onChange={(selected) =>
                setCarData({ ...carData, brand: selected?.value })
              }
            />
            {/* <input
              placeholder="Brand"
              className="form-control my-2"
              onChange={(e) =>
                setCarData({ ...carData, brand: e.target.value })
              }
            /> */}
            <input
              placeholder="Car Name"
              className="form-control my-2"
              onChange={(e) =>
                setCarData({ ...carData, carName: e.target.value })
              }
            />
            <Select
              placeholder="Select Model"
              options={modelsOptions}
              className="my-2"
              onChange={(selected) =>
                setCarData({ ...carData, model: selected?.value })
              }
            />
            <input
              placeholder="Rating"
              type="number"
              className="form-control my-2"
              onChange={(e) =>
                setCarData({ ...carData, rating: e.target.value })
              }
            />
            <button className="btn btn-primary mt-2" onClick={handleNext}>
              Next
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h4>🚘 Specs</h4>
            <input
              placeholder="Enter Price per Day"
              className="form-control my-2"
              onChange={(e) =>
                setCarData({ ...carData, price: e.target.value })
              }
            />
            <input
              placeholder="Speed"
              className="form-control my-2"
              onChange={(e) =>
                setCarData({ ...carData, speed: e.target.value })
              }
            />
            <input
              placeholder="Fuel Economy"
              className="form-control my-2"
              onChange={(e) =>
                setCarData({ ...carData, fuelEconomy: e.target.value })
              }
            />
            <input
              placeholder="Seat Type"
              className="form-control my-2"
              onChange={(e) =>
                setCarData({ ...carData, seatType: e.target.value })
              }
            />
            <label className="mt-2">Automatic:</label>
            <input
              type="checkbox"
              className="form-check-input mx-2"
              onChange={(e) =>
                setCarData({ ...carData, automatic: e.target.checked })
              }
            />
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-secondary" onClick={handleBack}>
                Back
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h4>📍 Location & Features</h4>
            <Select
              placeholder="Select Location"
              options={locationOptions}
              className="my-2"
              onChange={(selected) =>
                setCarData({ ...carData, location: selected?.value })
              }
            />
            <Select
              isMulti
              placeholder="Select Features"
              options={featuresOptions}
              className="my-2"
              onChange={(selectedOptions) =>
                setCarData({
                  ...carData,
                  features: selectedOptions.map((opt) => opt.value), // ✅ Only store values
                })
              }
            />
            <textarea
              placeholder="Description"
              rows={3}
              className="form-control my-2"
              onChange={(e) =>
                setCarData({ ...carData, description: e.target.value })
              }
            ></textarea>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-secondary" onClick={handleBack}>
                Back
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h4>📷 Upload Images (4)</h4>
            <input
              type="file"
              accept="image/*"
              multiple
              className="form-control my-2"
              onChange={handleImageChange}
            />
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-secondary" onClick={handleBack}>
                Back
              </button>
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AddCar;
