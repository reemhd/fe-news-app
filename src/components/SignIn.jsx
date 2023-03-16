import React, { useContext, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import placeholder from "../logo/placeholder.png";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { fetchUserByUsername } from "../utils/api";
import { CurrentUserContext } from "../context/CurrentUser";
import { Alert } from "@mui/material";

function SignIn() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null)
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleSignin = (event) => {
    event.preventDefault();
    fetchUserByUsername(username)
      .then((user) => {
        setCurrentUser(user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError('Invalid username')
      });
  };

  return (
    <>
      <div className="sign_in__header">
        <Link to={"/"}>
          <img src={placeholder} alt="logo" />
        </Link>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your username</p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Username"
                  id="formControlLg"
                  type="username"
                  size="lg"
                  onChange={(event) => setUsername(event.target.value)}
                />

                {/* <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                /> */}

                {/* <p className="small mb-3 pb-lg-2">
                  <a class="text-white-50" href="#!">
                    Forgot password?
                  </a>
                </p> */}
                <MDBBtn
                  outline
                  className="mx-2 px-5"
                  color="white"
                  size="lg"
                  onClick={handleSignin}
                >
                  Login
                </MDBBtn>

                <div className="d-flex flex-row mt-3 mb-5"></div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-white-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default SignIn;
