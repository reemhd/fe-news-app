import React, { useContext, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-white.png";
import logo1 from "../assets/logo1.png";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { fetchUserByUsername } from "../utils/api";
import { CurrentUserContext } from "../context/CurrentUser";
import { Alert } from "@mui/material";
import { ThemeContext } from "../context/Theme";

function SignIn() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  console.log(theme);

  const handleSignin = (event) => {
    event.preventDefault();
    fetchUserByUsername(username)
      .then((user) => {
        setCurrentUser(user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid username");
      });
  };

  return (
    <>
      {theme === "dark" ? (
        <div className="sign_in__header">
          <Link to={"/"}>
            <img src={logo1} alt="logo" />
          </Link>
        </div>
      ) : (
        <div className="sign_in__header">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="custom-card text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase text-black">
                  Login
                </h2>
                <p></p>
                <p className="text-black-50 mb-5">
                  Please select your username
                </p>
                <MDBDropdown>
                  <MDBDropdownToggle caret color="white" className="">
                    {username ? username : "Select username"}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem
                      className="px-4"
                      onClick={() => setUsername("tickle122")}
                    >
                      tickle122
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      className="px-4"
                      onClick={() => setUsername("grumpy19")}
                    >
                      grumpy19
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      className="px-4"
                      onClick={() => setUsername("happyamy2016")}
                    >
                      happyamy2016
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      className="px-4"
                      onClick={() => setUsername("cooljmessy")}
                    >
                      cooljmessy
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      className="px-4"
                      onClick={() => setUsername("weegembump")}
                    >
                      weegembump
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      className="px-4"
                      onClick={() => setUsername("jessjelly")}
                    >
                      jessjelly
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
                <MDBBtn
                  className="mx-2 px-5"
                  color="white"
                  size="lg"
                  onClick={handleSignin}
                  disabled={!username}
                >
                  Login
                </MDBBtn>

                <div className="d-flex flex-row mt-3 mb-5"></div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default SignIn;
