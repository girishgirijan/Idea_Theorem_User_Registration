import React from 'react';
import UserRegistrationContainer from './components/UserRegistrationContainer';
import { Grid } from "@mui/material";
import Navbar from './components/Nav/Navbar';

const App = () => { 

  return (
    <>
      <Navbar />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ padding: '20px' }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <UserRegistrationContainer />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
