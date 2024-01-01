import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Navbar() {
  const theme = useTheme();
  return (
    <>
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          position: "relative",
          backgroundColor: "#252f3d",
          paddingLeft: "100px",
          [theme.breakpoints.down("sm")]: {
            paddingLeft: "10px", // Adjust padding for small screens
          },
        }}
      >
        <Toolbar>
          <img src="/logo.png" alt="Logo" />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
