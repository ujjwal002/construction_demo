import style from "./Login.module.css";
import logo from "../../../public/logo.png";
import bg from "../../../public/Designer.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
// import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handelNavigate(e) {
    e.preventDefault();
    if (query.length === 0) {
      toast.error("Please Enter your country.");
    } else {
      navigate(`/home?country=${query}`);
    }
  }
  const handleInputChange = async (event) => {
    const query = event.target.value.trim();
    setQuery(query);
  };
  return (
    <div className={style.login_container}>
      <Toaster position="top-right" reverseOrder={false} />

      <div className={style.login_header}>
        <div className={style.login_header_left}>
          <img src={logo} alt="" style={{ width: "50px" }} />
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0px",
              padding: "0px",
              fontFamily: "cursive",
              fontSize: "33px",
              fontWeight: 700,
            }}
          >
            SupplySprinter
          </p>
        </div>
      </div>
      <div className={style.login_main_container}>
        <div>
          <form className="form-inline">
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  style={{ backgroundColor: "white", border: "none" }}
                >
                  <FontAwesomeIcon icon={faLocationDot} />{" "}
                </span>
              </div>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Enter your Location"
                aria-label="Search"
                style={{ width: "350px", height: "50px" }}
                value={query}
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={handelNavigate}
              className="btn btn-danger my-2 my-sm-0"
              type="submit"
              style={{ height: "50px", width: "60px" }}
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
