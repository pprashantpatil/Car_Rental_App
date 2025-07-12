import React, { useState } from "react";
import { Form, FormGroup, Row, Col, Label, Input } from "reactstrap";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      className="p-4 bg-white rounded shadow booking-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {!submitted ? (
        <Form onSubmit={submitHandler}>
          <motion.h4
            className="mb-4 text-primary fw-bold"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            🚘 Let's Get You Booked!
          </motion.h4>

          <Row>
            <Col md={6}>
              <FormGroup>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  <Label>👤 First Name</Label>
                  <Input type="text" placeholder="John" required />
                </motion.div>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <Label>👤 Last Name</Label>
                  <Input type="text" placeholder="Doe" />
                </motion.div>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <Label>📧 Email</Label>
                  <Input type="email" placeholder="you@example.com" required />
                </motion.div>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  <Label>📞 Phone</Label>
                  <Input type="number" placeholder="+91XXXXXXXXXX" required />
                </motion.div>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={5}
                >
                  <Label>📍 From</Label>
                  <Input type="text" placeholder="Pickup Location" required />
                </motion.div>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={6}
                >
                  <Label>📍 To</Label>
                  <Input type="text" placeholder="Drop Location" required />
                </motion.div>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={7}
                >
                  <Label>👥 Passengers</Label>
                  <Input type="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </Input>
                </motion.div>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={8}
                >
                  <Label>🧳 Luggage</Label>
                  <Input type="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </Input>
                </motion.div>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FormGroup>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={9}
                >
                  <Label>📅 Date</Label>
                  <Input type="date" required />
                </motion.div>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={10}
                >
                  <Label>⏰ Time</Label>
                  <Input type="time" required />
                </motion.div>
              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={11}
            >
              <Label>📝 Additional Notes</Label>
              <Input
                type="textarea"
                rows="3"
                placeholder="Any special instructions?"
              />
            </motion.div>
          </FormGroup>

          <motion.div
            className="text-end mt-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={12}
          >
            {/* <button className="btn btn-success px-4">🚀 Book Ride</button> */}
          </motion.div>
        </Form>
      ) : (
        <motion.div
          className="text-center"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://media.tenor.com/VaRYdgT9iGMAAAAC/car-driving.gif"
            alt="Booking confirmed"
            className="img-fluid mb-3"
            style={{ maxWidth: "200px" }}
          />
          <h4 className="text-success fw-bold">🎉 Booking Confirmed!</h4>
          <p>We'll send your ride details shortly.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BookingForm;
