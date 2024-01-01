import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import {
  createTheme,
  ThemeProvider,  
} from "@mui/material/styles";
import { AsYouType } from "libphonenumber-js";
import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import { validationSchema } from "../schemas";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: "red" },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: { paddingLeft: 40, paddingRight: 40 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        subtitle2: {
          fontWeight: "bold",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#db2f2f",
          marginLeft: "0px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#a5b6cd", // Change to your desired border color
            },
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#127c95",
    },
  },
});
const RegistrationForm = forwardRef((props, ref) => {
  const { handleSubmit } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = Array.from({ length: 100 }, (_, index) => 2025 - index);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      contactNumber: "",
      day: "",
      month: "",
      year: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Pass the form data to the parent component
      handleSubmit(values);      
    },
  });

  useEffect(() => {
    // Format the contact number using libphonenumber-js
    const formattedContactNumber = new AsYouType("CA").input(
      formik.values.contactNumber
    );
    formik.setFieldValue("contactNumber", formattedContactNumber);
  }, [formik.values.contactNumber]);

  const handleCancel = () => {
    // Handle the cancel logic here
    formik.resetForm();
  };
  useImperativeHandle(ref, () => ({
    handleCancel,
  }));

  return (
    <ThemeProvider theme={theme}>
      <Card elevation={6}>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="left">
                  Full Name
                </Typography>
                <TextField
                  id="fullName"
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  placeholder="Full Name *"
                  margin="dense"
                  required
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="left">
                  Contact Number
                </Typography>

                <TextField
                  id="contactNumber"
                  fullWidth
                  label="Contact Number"
                  variant="outlined"
                  placeholder="Contact Number *"
                  margin="dense"
                  required
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contactNumber}
                  error={
                    formik.touched.contactNumber &&
                    Boolean(formik.errors.contactNumber)
                  }
                  helperText={
                    formik.touched.contactNumber && formik.errors.contactNumber
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  align="left"
                  sx={{ mb: "10px" }}
                >
                  Birthdate
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <FormControl fullWidth size="small" required>
                      <InputLabel htmlFor="day">Day</InputLabel>
                      <Select
                        labelId="day"
                        label="Day *"
                        id="day"
                        name="day"
                        fullWidth
                        value={formik.values.day}
                        displayEmpty
                        inputProps={{ "aria-label": "Day" }}
                        required
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.day && Boolean(formik.errors.day)}
                      >
                        {days.map((day) => (
                          <MenuItem key={day} value={day}>
                            {day}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth size="small" required>
                      <InputLabel htmlFor="month">Month</InputLabel>
                      <Select
                        labelId="month"
                        label="Month *"
                        id="month"
                        name="month"
                        fullWidth
                        value={formik.values.month}
                        displayEmpty
                        inputProps={{ "aria-label": "Month" }}
                        required
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.month && Boolean(formik.errors.month)
                        }
                      >
                        {months.map((month, index) => (
                          <MenuItem key={index} value={index + 1}>
                            {month}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth size="small" required>
                      <InputLabel htmlFor="year">Year</InputLabel>
                      <Select
                        labelId="year"
                        label="Year *"
                        id="year"
                        name="year"
                        fullWidth
                        value={formik.values.year}
                        displayEmpty
                        inputProps={{ "aria-label": "Year" }}
                        required
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.year && Boolean(formik.errors.year)
                        }
                      >
                        {years.map((year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <FormHelperText>
                  {formik.touched.day && formik.errors.day}
                </FormHelperText>
                <FormHelperText>
                  {formik.touched.month && formik.errors.month}
                </FormHelperText>
                <FormHelperText>
                  {formik.touched.year && formik.errors.year}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="left">
                  Email Address
                </Typography>
                <TextField
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  placeholder="Email Address *"
                  required
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="left">
                  Password
                </Typography>
                <TextField
                  id="password"
                  label="Create Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="dense"
                  placeholder="Create Password *"
                  required
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" align="left">
                  Confirm Password
                </Typography>
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  margin="dense"
                  placeholder="Confirm Password *"
                  required
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ my: "15px" }}
      >
        <Grid item xs={4}>
          <Button variant="outlined" onClick={handleCancel} fullWidth>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            onClick={formik.handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
});

export default RegistrationForm;
