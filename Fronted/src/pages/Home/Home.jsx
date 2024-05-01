import React from "react";
import Navbar from "../../../src/components/navbar/Navbar";
import { useState } from "react";
import style from "./Home.module.css";

import { useDispatch } from "react-redux";
// import { addToCart } from '../store/actions/cartActions';
import { addToCartt } from "../../redux/actions/cartActions";

import MyMap from "../../components/Map/Map";

const Home = () => {
  const [headerData, setHeaderData] = useState([]);

  // Function to receive data from Header component
  const handleHeaderDataChange = (data) => {
    console.log("here also data changingv aginax");
    setHeaderData(data);
  };
  const dispatch = useDispatch();

  // Function to handle adding item to cart
  const addToCart = (item) => {
    dispatch(addToCartt(item));
    // Perform any other actions (e.g., remove item from list) here
  };
  console.log("bro", headerData);
  return (
    <div>
      <Navbar onDataChangeReal={handleHeaderDataChange} />
      {/* <Navbar /> */}

      {/* <div style={{ width: "200px", height: "200px" }}>
        <MyMap apiKey="e3b446d24b104135930030413e92cec2" />
      </div> */}

      {/* Render cards based on headerData */}
      <div className={style.search_results}>
        <img
          width="200"
          height="200"
          src="https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:-122.304378,47.526022&zoom=14&apiKey=e3b446d24b104135930030413e92cec2"
          alt="8531 East Marginal Way South, Tukwila, WA 98108, United States of America"
        ></img>
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
