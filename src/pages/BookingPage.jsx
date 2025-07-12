import { Form, FormGroup, Row, Col, Label, Input } from "reactstrap";
import { motion } from "framer-motion";
import "../../src/styles/booking-page.css";
import React, { useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const BookingPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [method, setMethod] = useState("");
  const [otp, setOtp] = useState("");
  const [processing, setProcessing] = useState(false);
  const [reserved, setReserved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReserve = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setReserved(true);
    }, 2500);
  };

  return (
    <motion.div
      className="p-4 bg-white rounded shadow booking-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {!submitted ? (
        <Form onSubmit={handleSubmit}>
          <motion.h4
            className="mb-4 text-primary fw-bold"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            🚘 Booking Details
          </motion.h4>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>👤 First Name</Label>
                <Input type="text" placeholder="John" required />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>👤 Last Name</Label>
                <Input type="text" placeholder="Doe" required />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>📧 Email</Label>
                <Input type="email" placeholder="you@example.com" required />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>📞 Phone</Label>
                <Input type="number" placeholder="+91XXXXXXXXXX" required />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>📍 From</Label>
                <Input type="text" placeholder="Pickup Location" required />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>📍 To</Label>
                <Input type="text" placeholder="Drop Location" required />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>👥 Passengers</Label>
                <Input type="select">
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
                <Input type="select">
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
                <Input type="date" required />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>⏰ Time</Label>
                <Input type="time" required />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label>📝 Additional Notes</Label>
            <Input
              type="textarea"
              rows="3"
              placeholder="Any special instructions?"
            />
          </FormGroup>

          <div className="text-end mt-4">
            <button className="btn btn-primary px-4 py-2">
              Continue to Payment
            </button>
          </div>
        </Form>
      ) : !reserved ? (
        <div className="payment-box mt-4">
          <h5 className="mb-4">Choose Payment Method</h5>

          {/** Payment Options */}
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

          {/** OTP */}
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
                <button className="btn btn-outline-secondary">Verify</button>
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
      ) : (
        <div className="text-center mt-5">
          <motion.img
            src="https://media.tenor.com/bm8Q6yAlsPsAAAAi/verified.gif"
            alt="Success"
            style={{ width: 120 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <h4 className="text-success mt-3">🎉 Booking Confirmed!</h4>
          <p>Details will be shared on your email & phone.</p>
        </div>
      )}
    </motion.div>
  );
};

export default BookingPage;
