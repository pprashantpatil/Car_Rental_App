// CarDetails.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import Carousel from "react-bootstrap/Carousel";
import carData from "../assets/data/carData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../../src/styles/cardetails.css";
import axios from "axios";

import { useLoading } from "../contexts/LoadingContext";
const CarDetails = () => {
  debugger;
  const { slug } = useParams();
  const [singleCarItem, setsingleCarItem] = useState(null);
  const { showLoader, hideLoader } = useLoading();
  const getImageUrl = (path) =>
    `https://carrentalapi-qyxk.onrender.com/${path}`;
  //const singleCarItem = carData.find((item) => item.carName === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  useEffect(() => {
    debugger;
    showLoader();
    axios
      .get("https://carrentalapi-qyxk.onrender.com/api/getcars")
      .then((res) => {
        setsingleCarItem(res.data.find((item) => item.carName === slug));
        hideLoader();
      })
      .catch((err) => {
        console.error("Error fetching cars:", err);
        hideLoader();
      });
    console.log("singleCarItem", singleCarItem);
  }, [slug]);
  return (
    singleCarItem && (
      <Helmet title={singleCarItem.carName}>
        <section>
          <Container>
            <br />
            <Row>
              <Col lg="6">
                <Carousel>
                  {singleCarItem.gallery.map((img, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={getImageUrl(img)}
                        alt={`Car view ${index}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>

              <Col lg="6">
                <div className="car__info">
                  <h2 className="section__title">{singleCarItem.carName}</h2>
                  <h6 className="rent__price fw-bold fs-4 mt-2">
                    Rs.{singleCarItem.price}.00 / Day
                  </h6>
                  <p className="text-muted">{singleCarItem.description}</p>

                  <div className="d-flex flex-wrap gap-3 mt-3">
                    {singleCarItem.features.map((feature, idx) => (
                      <span key={idx} className="badge bg-info text-dark">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-4 text-muted">
                    <li>✅ Fuel Economy: {singleCarItem.fuelEconomy}</li>
                    <li>📍 Location: {singleCarItem.location}</li>
                    <li>⭐ Rated by {singleCarItem.rating} users</li>
                    <li>📄 License Required</li>
                  </ul>

                  <div className="alert alert-success mt-4">
                    🎉 Use code <strong>RENT50</strong> to get ₹50 off!
                  </div>
                  <motion.div
                    className="mt-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        y: [0, -5, 0],
                        transition: { repeat: Infinity, duration: 1.5 },
                      }}
                    >
                      <Link
                        to={`/booking/${singleCarItem.carName}`}
                        className="btn animated-book-btn text-white fw-bold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2"
                      >
                        <span className="car-icon">🚗</span>
                        Book Now
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </Col>

              {/* <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold">Booking Information</h5>
                <BookingForm />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col> */}

              <Col lg="12" className="mt-5">
                <h5 className="fw-bold mb-3">Customer Reviews</h5>
                {singleCarItem.reviews.map((review, idx) => (
                  <div key={idx} className="border-bottom pb-2 mb-2">
                    <strong>{review.user}</strong> - {review.rating}⭐
                    <p className="mb-0 text-muted">{review.comment}</p>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    )
  );
};

export default CarDetails;
