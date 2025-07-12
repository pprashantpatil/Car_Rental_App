// import all images from assets/images directory
import img01 from "../all-images/cars-img/nissan-offer.png";
import img02 from "../all-images/cars-img/offer-toyota.png";
import img03 from "../all-images/cars-img/bmw-offer.png";
import img04 from "../all-images/cars-img/nissan-offer.png";
import img05 from "../all-images/cars-img/offer-toyota.png";
import img06 from "../all-images/cars-img/mercedes-offer.png";
import img07 from "../all-images/cars-img/toyota-offer-2.png";
import img08 from "../all-images/cars-img/mercedes-offer.png";

const carData = Array.from({ length: 50 }).map((_, index) => {
  const id = index + 1;
  const brands = [
    "Tesla",
    "BMW",
    "Audi",
    "Mercedes",
    "Toyota",
    "Hyundai",
    "Kia",
  ];
  const models = [
    "Model X",
    "X5",
    "A4",
    "E-Class",
    "Fortuner",
    "Creta",
    "Seltos",
  ];
  const locations = ["Pune", "Mumbai", "Delhi", "Bangalore", "Hyderabad"];
  const seats = ["Leather Seats", "Heated Seats", "Memory Seats"];
  const featuresList = [
    "Sunroof",
    "Navigation",
    "Bluetooth",
    "Rear Camera",
    "Lane Assist",
    "Cruise Control",
    "Wireless Charging",
    "Ambient Lighting",
  ];
  const imgs = [img01, img02, img02, img04, img05, img06, img07, img08];

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomRating = (min = 4.3, max = 5.0) =>
    (Math.random() * (max - min) + min).toFixed(1);

  return {
    id,
    brand: random(brands),
    rating: parseFloat(randomRating()),
    carName: `${random(brands)} ${random(models)} ${id}`,
    imgUrl: imgs[id % imgs.length],
    model: `20${Math.floor(Math.random() * 5 + 20)}`,
    price: Math.floor(Math.random() * 5000 + 5000),
    speed: `${Math.floor(Math.random() * 50 + 200)} km/h`,
    gps: "GPS Navigation",
    seatType: random(seats),
    automatic: "Automatic",
    fuelEconomy: `${Math.floor(Math.random() * 10 + 10)} km/l`,
    location: random(locations),
    description:
      "Experience luxury and performance with this premium vehicle, offering a perfect blend of comfort and cutting-edge technology.",
    features: Array.from({ length: 4 }).map(() => random(featuresList)),
    reviews: [
      {
        user: "User " + id,
        rating: parseFloat(randomRating()),
        comment: "Great experience. Would rent again!",
      },
      {
        user: "Guest " + id,
        rating: parseFloat(randomRating()),
        comment: "Smooth drive and very comfortable.",
      },
    ],
    gallery: [
      imgs[(id + 1) % imgs.length],
      imgs[(id + 2) % imgs.length],
      imgs[(id + 3) % imgs.length],
    ],
  };
});

export default carData;
