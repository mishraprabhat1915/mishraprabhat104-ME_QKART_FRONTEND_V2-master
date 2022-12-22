import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading,setLoading]=useState(false);
  const history=useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  
  const onUpdateField = (event) => {
    const nextFormState = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(nextFormState);
  };

  const register = async(formData)=>{
    if (!validateInput(formData)) return;
    try{
      setLoading(true);
      await axios.post(`${config.endpoint}/auth/register`,{
        username: formData.username,
        password: formData.password,
      });
      setLoading(false);
      setFormData({
        username:"",
        password:"",
        confirmPassword:"",
      });
      enqueueSnackbar("Registered Successfully",{variant:"success"});
      history.push("/login",{from:"Register Page"})
    }catch (e){
      setLoading(false);
      if (e.response && e.response.status === 400){
        enqueueSnackbar(e.response.data.message, {variant:"error"});
      }else{
        enqueueSnackbar("Something went wrong. Check that the backened is running, reachable and returns valid JSON",{variant:"error"});
      };
    }
  };


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  // const register = async (formData) => {
  // };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
//   const validateInput = (data) => {
//     let errors={}
//     // Username validate
//     if (!data.username){
//       errors.username="Username is a required field"
//     }
//     else if(data.username.length <6) {
//       errors.username="Username must be at least 6 characters"
//     }
// //password validate
//     if (!data.password){
//       errors.password="Password is a required field"
//     }
//     else if(data.password.length <6) {
//       errors.password="Password must be at least 6 characters"
//     }
// // confirm password validate
//     if (!data.confirmPassword){
//       errors.confirmPassword="Password is a required field"
//     }
//     else if(data.password!==data.confirmPassword){
//       errors.confirmPassword="Confirm Password does not match"
//     }

//     return errors;
//     };
const validateInput=(data)=>{
if (!data.username){
  enqueueSnackbar("Username is a required field",{variant:"warning"});
  return false;
}
if (data.username.length < 6){
  enqueueSnackbar("Username must be at least 6 characters",{variant:"warning"});
  return false;
}
if (!data.password){
  enqueueSnackbar("Password is a required field",{variant:"warning"});
  return false;
}
if (data.password.length < 6){
  enqueueSnackbar("Password must be at least 6 characters",{variant:"warning"});
  return false;
}
if (!data.confirmPassword){
  enqueueSnackbar("Confirm Password is a required field",{variant:"warning"});
  return false;
}
if (data.password !== data.confirmPassword){
  enqueueSnackbar("Passwords do not match",{variant:"warning"});
  return false;
}
return true;
};


  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={onUpdateField}
            value={formData.username}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={onUpdateField}
            value={formData.password}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={onUpdateField}
            value={formData.confirmPassword}
          />
          {loading ? (<Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress size={25} color="primary"/>
          </Box>):(<Button className="button" type="submit" variant="contained" onClick={()=>register(formData)}>
            Register Now
           </Button>)}
          <p className="secondary-action">
            Already have an account?{" "}
             <Link className="link" to="/login">
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;