import React, { useState } from "react";

import logo from "../../../public/logo.png";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// Navbar component
function Navbar() {
  return (
    <nav
      className="navbar navbar-dark navbar-expand p-0 bg-dark "
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "red",
      }}
    >
      <p
        style={{
          padding: "0px",
          margin: "0px",
          height: "45px",
          display: "flex",
          alignItems: "center",
        }}
      >
        ** No 1 construction site **
      </p>
    </nav>
  );
}

// HeaderMain component
function HeaderMain({ onDataChange }) {
  const [totalItems, setTotalItems] = useState();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total quantity of items in the cart
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  useEffect(() => {
    setTotalItems(totalQuantity);
  }, [totalQuantity]);
  async function handelValueChange(e) {
    console.log("valus is changing");
    const resposne = await axios.get("http://localhost:3000/search", {
      params: {
        search: e.target.value,
      },
    });

    onDataChange(resposne.data.items);

    console.log(resposne.data.items);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/search");
        onDataChange(response.data.items);
        console.log(response.data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <section className="header-main border-bottom bg-white">
      <div className="container-fluid">
        <div className="row p-2 pt-3 pb-3 d-flex align-items-center">
          <div className="col-md-2 d-flex">
            <img
              className="d-none d-md-flex align-self-center mr-2"
              src={logo}
              width="50"
              alt="Logo"
            />
            <p className="align-self-center m-0">Supply Sprinter</p>
          </div>
          <div className="col-md-8">
            <div className="d-flex form-inputs">
              <input
                className="form-control"
                type="text"
                placeholder="Search any product..."
                onChange={handelValueChange}
              />
              <i className="bx bx-search"></i>
            </div>
          </div>
          <div className="col-md-2">
            <div className="d-flex d-none d-md-flex flex-row align-items-center">
              <span className="shop-bag">
                <i className="bx bxs-shopping-bag"></i>
              </span>
              <div className="d-flex flex-column ms-2">
                <span className="qty">{totalItems} Product</span>
                <span className="fw-bold">$0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Header component combining Navbar, HeaderMain, and MainNavbar
function Header({ onDataChangeReal }) {
  const [data, setData] = useState([]);

  // Function to handle data change and pass it down to Navbar
  const handleDataChange = (newData) => {
    console.log("here also data changing");
    setData(newData);
  };

  useEffect(() => {
    onDataChangeReal(data);
  }, [data, onDataChangeReal]);

  return (
    <header className="section-header">
      <Navbar />
      <HeaderMain onDataChange={handleDataChange} />
    </header>
  );
}

export default Header;
