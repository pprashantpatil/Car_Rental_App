// WhatsAppSender.js
import axios from "axios";
import { useEffect } from "react";

const WhatsAppSender = ({ phone, booking }) => {
  useEffect(() => {
    if (!phone || !booking) return;

    const sendWhatsAppMessage = async () => {
      const message = `🚗 *Booking Confirmed!*\n\n*Name:* ${booking.firstName} ${booking.lastName}\n*Car:* ${booking.carName}\n*Pickup:* ${booking.pickupDate}, ${booking.pickupTime}\n*From:* ${booking.pickupLocation}\n*To:* ${booking.dropLocation}\n*Total:* ₹${booking.totalAmount}\n\nThanks for booking with us!`;

      try {
        await axios.post(
          "https://carrentalapi-qyxk.onrender.com/api/send-whatsapp",
          {
            to: `+91${phone}`,
            message,
          }
        );
        console.log("✅ WhatsApp message sent!");
      } catch (error) {
        console.error("❌ Error sending WhatsApp:", error);
      }
    };

    sendWhatsAppMessage();
  }, [phone, booking]);

  return null; // No UI needed
};

export default WhatsAppSender;
