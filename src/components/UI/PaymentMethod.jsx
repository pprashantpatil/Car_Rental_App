import { useState } from "react";
import { motion } from "framer-motion";
const PaymentSection = () => {
  const [method, setMethod] = useState("");
  const [otp, setOtp] = useState("");
  const [reserved, setReserved] = useState(false);
  const [processing, setProcessing] = useState(false);
  const handleReserve = () => {
    // if (!otp || otp.length !== 6) {
    //   alert("Please enter a valid 6-digit OTP.");
    //   return;
    // }

    setProcessing(true);

    // Simulate payment processing delay
    setTimeout(() => {
      setProcessing(false);
      setReserved(true);
    }, 2500);
  };
  return (
    <div className="payment-box p-4 bg-white shadow-sm rounded">
      <h5 className="mb-4">Choose Payment Method</h5>

      {!reserved && (
        <>
          {/* Direct Bank Transfer */}
          <div className="payment-option mb-3">
            <label className="d-flex align-items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={method === "bank"}
                onChange={() => setMethod("bank")}
              />
              Direct Bank Transfer
            </label>
            {method === "bank" && (
              <div className="mt-2 ps-4">
                <input
                  className="form-control mb-2"
                  placeholder="Account Number"
                />
                <input className="form-control mb-2" placeholder="IFSC Code" />
                <input
                  className="form-control"
                  placeholder="Account Holder Name"
                />
              </div>
            )}
          </div>

          {/* Cheque */}
          <div className="payment-option mb-3">
            <label className="d-flex align-items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cheque"
                checked={method === "cheque"}
                onChange={() => setMethod("cheque")}
              />
              Cheque Payment
            </label>
            {method === "cheque" && (
              <div className="mt-2 ps-4">
                <input
                  className="form-control mb-2"
                  placeholder="Cheque Number"
                />
                <input className="form-control" placeholder="Bank Name" />
              </div>
            )}
          </div>

          {/* MasterCard */}
          <div className="payment-option mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <label className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={method === "card"}
                  onChange={() => setMethod("card")}
                />
                Master Card
              </label>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                alt="MasterCard"
                height={25}
              />
            </div>
            {method === "card" && (
              <div className="mt-2 ps-4">
                <input
                  className="form-control mb-2"
                  placeholder="Card Number"
                />
                <div className="d-flex gap-2">
                  <input className="form-control" placeholder="Expiry" />
                  <input className="form-control" placeholder="CVV" />
                </div>
              </div>
            )}
          </div>

          {/* Paypal */}
          <div className="payment-option mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <label className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={method === "paypal"}
                  onChange={() => setMethod("paypal")}
                />
                PayPal
              </label>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                height={25}
              />
            </div>
            {method === "paypal" && (
              <div className="mt-2 ps-4">
                <input className="form-control" placeholder="PayPal Email" />
              </div>
            )}
          </div>

          {/* OTP Verification */}
          <div className="otp-box border-top pt-4 mt-4">
            <h6 className="mb-2">🔐 Enter OTP sent to your mobile</h6>
            <div className="d-flex gap-2 align-items-center">
              <input
                type="text"
                className="form-control w-25"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="btn btn-outline-primary">Verify OTP</button>
            </div>
          </div>

          {/* Final Reserve Button */}
          <div className="text-end mt-4">
            <button
              className="btn btn-success px-4 py-2"
              onClick={handleReserve}
              disabled={processing}
            >
              {processing ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Processing...
                </>
              ) : (
                "Reserve Now"
              )}
            </button>
            {processing && (
              <motion.div
                className="processing-overlay d-flex flex-column justify-content-center align-items-center"
                style={{
                  position: "absolute",
                  top: 160,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255,255,255,0.8)",
                  zIndex: 10,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.img
                  src="https://media.tenor.com/S59bPkT0pqcAAAAi/loading.gif"
                  alt="Loading"
                  style={{ width: 80 }}
                />
                <p className="mt-3 fw-semibold">Processing your payment...</p>
              </motion.div>
            )}
          </div>
        </>
      )}
      {reserved && (
        <div className="reservation-success text-center mt-5">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 15,
              duration: 0.6,
            }}
          >
            <motion.img
              src="https://media.tenor.com/bm8Q6yAlsPsAAAAi/verified.gif"
              alt="Booking Confirmed"
              className="car-gif mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: [0.8, 1.2, 1] }}
              transition={{ duration: 0.8 }}
            />

            <motion.h4
              className="text-success fw-bold"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              🎉 Booking Confirmed!
            </motion.h4>

            <motion.p
              className="text-muted"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              We'll send your ride details shortly.
            </motion.p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;
