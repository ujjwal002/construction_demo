import React from "react";
import Navbar from "../../../src/components/navbar/Navbar";
import { useState } from "react";
import style from "./Home.module.css";

const Home = () => {
  const [headerData, setHeaderData] = useState([]);
  const [addCart, setAddCart] = useState(0);

  // Function to receive data from Header component
  const handleHeaderDataChange = (data) => {
    console.log("here also data changingv aginax  ");
    setHeaderData(data);
  };
  function addToCart() {
    console.log("hello");
    setAddCart((prev) => {
      prev + 1;
    });
  }
  console.log("bro", headerData);
  return (
    <div>
      <Navbar onDataChangeReal={handleHeaderDataChange} />
      {/* <Navbar /> */}

      {/* Render cards based on headerData */}
      <div className={style.search_results}>
        {headerData.map((item) => (
          <div
            key={item.id}
            className="card row"
            style={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <img
              className="card-img-top"
              src={
                item.pagemap.metatags[0]?.["og:image"] ||
                "../../../public/no-image-icon-23499.png"
              }
              alt="Card image cap"
              style={{ width: "200px", height: "200px" }}
            />
            <div className="card-body">
              <h5 className="card-title">
                {" "}
                <a href={item.link}>
                  <h5 className="card-title">{item.title}</h5>
                </a>
              </h5>
              <p className="card-text">{item.snippet}</p>
              <button
                className="btn btn-primary"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
