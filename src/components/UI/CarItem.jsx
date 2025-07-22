import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoading } from "../../contexts/LoadingContext";

const CarItem = (props) => {
  const { showLoader, hideLoader } = useLoading();

  const { imgUrl, model, carName, automatic, speed, price, isActive, id } =
    props.item;
  hideLoader();
  const navigate = useNavigate();

  const handleToggleActive = (carId, newStatus) => {
    showLoader();
    axios
      .put(`https://carrentalapi-qyxk.onrender.com/api/${carId}/status`, {
        isActive: newStatus,
      })
      .then(() => {
        hideLoader();
        const msg = newStatus
          ? "Car has been activated successfully."
          : "Car has been deactivated successfully.";
        toast.success(msg);
        props.onStatusChange();
      })
      .catch((err) => {
        console.error("Status toggle failed", err);
        hideLoader();
      });
  };

  const getImageUrl = (path) =>
    `https://carrentalapi-qyxk.onrender.com/${path}`;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5 hover-scale">
      <div className="car__item">
        <div className="car__img position-relative">
          <img src={getImageUrl(imgUrl)} alt="" className="w-100" />

          {/* Enable/Disable Toggle Icon */}
          <span
            className="position-absolute top-0 end-0 m-2 p-2 bg-light rounded-circle"
            style={{ cursor: "pointer", zIndex: 10 }}
            title={!isActive ? "Click to Disable" : "Click to Enable"}
            onClick={() => handleToggleActive(id, isActive)}
          >
            <i
              className={`ri-checkbox-circle-line`}
              style={{
                fontSize: "1.6rem",
                color: !isActive ? "#28a745" : "#adb5bd", // green if active, gray if inactive
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          </span>
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center">
            Rs.{price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {speed}
            </span>
          </div>

          <button
            className="w-50 car__item-btn car__btn-rent"
            onClick={() => navigate(`/cars/${carName}`)}
          >
            Rent
          </button>

          <button
            className="w-50 car__item-btn car__btn-details"
            onClick={() => navigate(`/cars/${carName}`)}
          >
            Details
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
