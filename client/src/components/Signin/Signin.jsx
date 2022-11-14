import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
// import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../actions/Auth";
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function Signin() {
  const [formData, setFormData] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: "auth", data: { result, token } });
  //     navigate("/", { replace: true });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const googleFaliure = (error) => {
  //   console.log(error);
  //   console.log("google something went wrong");
  // };

  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (
        formData.name === "" ||
        formData.email === "" ||
        formData.password === "" ||
        formData.confirmPassword === ""
      ) {
        alert("All fields are Mandatory!");
        return;
      }
      dispatch(signUp(formData, navigate));
    } else {
      if (formData.email === "" || formData.password === "") {
        alert("All fields are Mandatory!");
        return;
      }
      dispatch(signIn(formData, navigate));
    }
  };

  return (
    <div className="signin-page-container">
      {/* <div className="signin-page-image">Hello There</div> */}
      <div className="signin-page-inputs">
        <div className="signin-page-logo">GAMEON</div>
        <div className="signin-page-text">Hello!</div>
        <div className="signin-page-sub-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
          fuga laboriosam, reiciendis, laborum.
        </div>
        {isSignUp ? (
          <form className="signin-page-form">
            <TextField
              name="name"
              type="text"
              fullWidth={true}
              label="Full Name"
              required={true}
              size="small"
              margin="dense"
              autoFocus={true}
              variant="filled"
              onChange={HandleChange}
            />
            <TextField
              name="email"
              type="email"
              fullWidth={true}
              label="Email"
              required={true}
              size="small"
              margin="dense"
              variant="filled"
              onChange={HandleChange}
            />
            <TextField
              name="password"
              type="password"
              fullWidth={true}
              label="Password"
              required={true}
              size="small"
              margin="dense"
              variant="filled"
              onChange={HandleChange}
            />
            <TextField
              name="confirmPassword"
              type="password"
              fullWidth={true}
              label="Confirm Password"
              required={true}
              size="small"
              margin="dense"
              variant="filled"
              onChange={HandleChange}
            />

            <Button
              variant="contained"
              fullWidth={true}
              sx={{ marginTop: "20px" }}
              type="submit"
              onClick={HandleSubmit}
            >
              Sign Up
            </Button>
          </form>
        ) : (
          <form className="signin-page-form">
            <TextField
              name="email"
              type="email"
              fullWidth={true}
              label="Email"
              required={true}
              size="small"
              margin="dense"
              variant="filled"
              onChange={HandleChange}
              autoFocus={true}
            />
            <TextField
              name="password"
              type="password"
              fullWidth={true}
              label="Password"
              required={true}
              size="small"
              margin="dense"
              variant="filled"
              onChange={HandleChange}
            />
            <Button
              variant="contained"
              fullWidth={true}
              sx={{ marginTop: "20px" }}
              type="submit"
              onClick={HandleSubmit}
            >
              Sign In
            </Button>
            {/* <GoogleLogin
              clientId="840475523899-8293g0ej5hsliutqil0ifbf1a0gh0bgb.apps.googleusercontent.com"
              className="google-sign-in-button"
              onSuccess={googleSuccess}
              onFailure={googleFaliure}
              cookiePolicy="single_host_origin"
            /> */}
          </form>
        )}

        <div className="signin-page-bottom-content">
          {isSignUp ? "Already" : "Don't"} have an account yet?
          <div onClick={() => setIsSignUp((prev) => !prev)}>
            {isSignUp ? "Sign In." : "Sign Up."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
