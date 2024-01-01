import React, { useState, useRef } from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import RegistrationForm from "./UserRegistration";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRegistrationContainer = () => {
  const [clearForm, ResetFormValues] = useState(false);
  const childRef = useRef(null);
  const callFormReset = () => {
    // Check if the childRef is defined before calling the function
    if (childRef.current) {
      childRef.current.handleCancel();
    }
  };

  //Submitting data to API (Creating a new user)
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://fullstack-test-navy.vercel.app/api/users/create",
        {
          full_name: values.fullName,
          contact_number: values.contactNumber,
          email: values.email,
          date_of_birth: values.day + "-" + values.month + "-" + values.year,
          password: values.password,
          confirm_password: values.confirmPassword,
        }
      );

      if (response.status === 200) {
        // Successful API call
        toast.success("New user successfully created. Thank you!");
        //Clearing fileds after successfull user creation
        callFormReset();
        // You can perform any additional actions here if needed
      }
    } catch (error) {
      // Error in API call
      toast.error("Failed to create user. Please try again.");
    }
  };
  return (
    <Box>
      <Container
        maxWidth="xs"
        style={{
          marginTop: "10px",
          padding: "2px",
          minHeight: "200px",
          height: "90vh",
        }}
      >
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <ToastContainer
            position="center"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick={true}
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Grid item xs={12}>
            <Typography variant="h6">Create User Account</Typography>
          </Grid>
          <Grid item xs={12}>
            <RegistrationForm ref={childRef} handleSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserRegistrationContainer;
