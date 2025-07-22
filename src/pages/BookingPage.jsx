import React, { useState, useEffect } from "react";
import { Form, FormGroup, Row, Col, Label, Input } from "reactstrap";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PaymentFailed from "../../src/assets/icons/PaymentFailed.mp4";
import bookingcompleted from "../../src/assets/icons/bookingcompleted.mp4";
import LocationSearchInput from "../../src/components/LocationSearchInput";
import "../../src/styles/Loading-context.css";
import WhatsAppSender from "../../src/components/WhatsAppSender";
const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const BookingPage = () => {
  const { slug } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [method, setMethod] = useState("");
  const [selectedCar, setselectedCar] = useState(slug);
  const [calculatedAmount, setcalculatedAmount] = useState(1000);

  const [otp, setOtp] = useState("");
  const [processing, setProcessing] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [bookingExpired, setBookingExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pickup: "",
    drop: "",
    passengers: "1",
    luggage: "1",
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  useEffect(() => {
    console.log("Slug from URL:", slug);

    if (slug) {
      setselectedCar(slug); // Set when component mounts
    }
  }, [slug]);
  useEffect(() => {
    if (!submitted || reserved || bookingExpired) return;
    if (timeLeft <= 0) return setBookingExpired(true);
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [submitted, reserved, bookingExpired, timeLeft]);

  const handleReserve = () => {
    //console.log(formData);
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setReserved(true);
    }, 3000);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <motion.div
      className="p-4 bg-white rounded shadow booking-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {bookingExpired ? (
        <motion.div
          className="text-center text-danger mt-5"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <video
            src={PaymentFailed}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", maxWidth: "320px", borderRadius: "10px" }}
          />

          <h4 className="mt-3 fw-bold">⏳ Booking Expired!</h4>
          <p className="text-muted">Please start the booking process again.</p>
          <Link to="/cars" className="btn btn-outline-primary mt-3">
            🔁 Go Back to Cars
          </Link>
        </motion.div>
      ) : !submitted ? (
        <>
          <motion.h4
            className="mb-4 text-primary fw-bold"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            🚘 Booking Details
          </motion.h4>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>👤 First Name</Label>
                  <Input
                    type="text"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>👤 Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>📧 Email</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>📞 Phone</Label>
                  <Input
                    type="tel"
                    placeholder="+91XXXXXXXXXX"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <LocationSearchInput
                    label="📍 From"
                    onSelect={(location) =>
                      setFormData((prev) => ({ ...prev, pickup: location }))
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <LocationSearchInput
                    label="🏁 To"
                    onSelect={(location) =>
                      setFormData((prev) => ({ ...prev, drop: location }))
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>👥 Passengers</Label>
                  <Input
                    type="select"
                    value={formData.passengers}
                    onChange={(e) =>
                      setFormData({ ...formData, passengers: e.target.value })
                    }
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>🧳 Luggage</Label>
                  <Input
                    type="select"
                    value={formData.luggage}
                    onChange={(e) =>
                      setFormData({ ...formData, luggage: e.target.value })
                    }
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>📅 Date</Label>
                  <Input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>⏰ Time</Label>
                  <Input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label>📝 Additional Notes</Label>
              <Input
                type="textarea"
                rows="3"
                placeholder="Any special instructions?"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </FormGroup>

            <div className="text-end mt-4">
              <button className="btn btn-primary px-4 py-2" type="submit">
                Continue to Payment
              </button>
            </div>
          </Form>
        </>
      ) : !reserved ? (
        <div className="payment-overlay-wrapper">
          <div className="timer-badge text-white bg-danger">
            ⏱ {formatTime(timeLeft)}
          </div>

          <div className="freeze-screen">
            <div className="alert alert-warning text-center fw-bold">
              🚨 Your booking is reserved for{" "}
              <span>{formatTime(timeLeft)}</span>.
              <br /> Please complete payment to confirm your ride.
            </div>

            <div className="payment-box mt-4">
              <h5 className="mb-4">Choose Payment Method</h5>

              <div className="mb-3">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    onChange={() => setMethod("bank")}
                  />{" "}
                  Bank Transfer
                </label>
                {method === "bank" && (
                  <div className="mt-2">
                    <Input className="mb-2" placeholder="Account Number" />
                    <Input className="mb-2" placeholder="IFSC Code" />
                    <Input placeholder="Account Holder Name" />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    onChange={() => setMethod("card")}
                  />{" "}
                  Credit/Debit Card
                </label>
                {method === "card" && (
                  <div className="mt-2">
                    <Input className="mb-2" placeholder="Card Number" />
                    <Row>
                      <Col>
                        <Input className="mb-2" placeholder="Expiry" />
                      </Col>
                      <Col>
                        <Input className="mb-2" placeholder="CVV" />
                      </Col>
                    </Row>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    onChange={() => setMethod("paypal")}
                  />{" "}
                  PayPal
                </label>
                {method === "paypal" && (
                  <div className="mt-2">
                    <Input placeholder="PayPal Email" />
                  </div>
                )}
              </div>

              <div className="mt-4">
                <Label>🔐 OTP Verification</Label>
                <Row className="align-items-center">
                  <Col md={6}>
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <button className="btn btn-outline-secondary">
                      Verify
                    </button>
                  </Col>
                </Row>
              </div>

              <div className="text-end mt-4">
                <button
                  className="btn btn-success px-4"
                  onClick={handleReserve}
                  disabled={processing}
                >
                  {processing ? "Processing..." : "Reserve Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          {/* ✅ WhatsApp auto message trigger */}
          <WhatsAppSender
            phone={formData.phone} // or "+9199xxxxxxx"
            booking={{
              firstName: formData.firstName,
              lastName: formData.lastName,
              carName: selectedCar || "N/A",
              pickupDate: formData.date,
              pickupTime: formData.time,
              pickupLocation: formData?.pickup.address || "N/A",
              dropLocation: formData?.drop.address || "N/A",
              totalAmount: calculatedAmount,
            }}
          />

          <video
            src={bookingcompleted}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", maxWidth: "320px", borderRadius: "10px" }}
          />

          <h4 className="text-success mt-3">🎉 Booking Confirmed!</h4>
          <motion.img
            src="https://media.tenor.com/bm8Q6yAlsPsAAAAi/verified.gif"
            alt="Success"
            style={{ width: 80 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <p>Details will be shared on your email & phone.</p>
        </div>
      )}
    </motion.div>
  );
};

export default BookingPage;
