import React, { useState } from "react";
import style from "./Login.module.css";
import logo from "../../../public/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = async (event) => {
    const query = event.target.value;

    setInputValue(query);

    if (query === "") {
      setPlaces([]); // Clear places if query is empty
      return;
    }

    const options = {
      method: "GET",
      url: `https://api.geoapify.com/v1/geocode/search?text=${query}&apiKey=e3b446d24b104135930030413e92cec2`,

      headers: {},
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.features);
      setPlaces(response.data.features);
    } catch (error) {
      console.error("Error fetching data:", error);
      setPlaces([]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      toast.error("Please enter your location.");
    } else {
      navigate(`/home`);
    }
  };

  function handelChangePlace(data) {
    setInputValue(data);
  }

  return (
    <div className={style.login_container}>
      <Toaster position="top-right" reverseOrder={false} />

      <div className={style.login_header}>
        <div className={style.login_header_left}>
          <img src={logo} alt="Logo" style={{ width: "50px" }} />
          <p className={style.logo_text}>SupplySprinter</p>
        </div>
      </div>

      <div className={style.login_main_container}>
        <form className={style.form} onSubmit={handleFormSubmit}>
          <div className="input-group">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                style={{ backgroundColor: "white", border: "none" }}
              >
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
            </div>
            <input
              className="form-control"
              type="text"
              placeholder="Enter your Location"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-danger" type="submit">
            Go
          </button>
        </form>
        <ul className={style.places_list}>
          {places.map((place, index) => (
            <li
              key={index}
              onClick={() => handelChangePlace(place.properties.formatted)}
            >
              {place.properties.formatted}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Login;
