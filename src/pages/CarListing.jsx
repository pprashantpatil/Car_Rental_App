import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";

const CarListing = () => {
  const [sortType, setSortType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCars = [...carData]
    .filter((car) => (selectedBrand ? car.brand === selectedBrand : true))
    .filter((car) =>
      car.carName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "lowToHigh") return a.price - b.price;
      if (sortType === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="p-3 rounded shadow-sm bg-white border d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
                {/* 🔍 Search */}
                <div className="d-flex flex-column">
                  <label className="mb-1 fw-semibold">
                    <i className="ri-search-line me-1"></i>Search by Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Tesla, BMW..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* 🔽 Sort by Price */}
                <div className="d-flex flex-column">
                  <label className="mb-1 fw-semibold">
                    <i className="ri-sort-asc me-1"></i>Sort by Price
                  </label>
                  <select
                    className="form-select"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                  </select>
                </div>

                {/* 🚗 Filter by Brand */}
                <div className="d-flex flex-column">
                  <label className="mb-1 fw-semibold">
                    <i className="ri-car-line me-1"></i>Filter by Brand
                  </label>
                  <select
                    className="form-select"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Toyota">Toyota</option>
                    <option value="BMW">BMW</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Ferrari">Ferrari</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="Audi">Audi</option>
                    <option value="Colorado">Colorado</option>
                  </select>
                </div>

                {/* 🔁 Reset Button */}
                <div className="d-flex flex-column">
                  <label className="invisible mb-1">Reset</label>{" "}
                  {/* Keeps height alignment */}
                  <button
                    className="btn btn-danger px-4"
                    onClick={() => {
                      setSortType("");
                      setSelectedBrand("");
                      setSearchTerm("");
                    }}
                  >
                    <i className="ri-refresh-line me-1"></i>Reset
                  </button>
                </div>
              </div>
            </Col>

            {filteredCars.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
