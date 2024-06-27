import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { EMAIL_VALIDATION_REGEX } from "../utils/constants";
import { Signup } from "../service/AuthService";

const defaultTheme = createTheme();

export default function SignUp({ history }: any) {
  const [errors, setErrors] = React.useState<{
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
  }>({
    email: null,
    password: null,
    confirmPassword: null,
  });
  const formValidation = (data: {
    email: any;
    password: any;
    confirmPassword: any;
  }) => {
    let isValid = true;
    debugger;
    if (!data.email) {
      storeErrors("email", "Cant be blank");
      isValid = false;
    }
    const isEmailVaild = EMAIL_VALIDATION_REGEX.test(data?.email?.toString());
    if (!!data.email && !isEmailVaild) {
      storeErrors("email", "Invalid email");
      isValid = false;
    }
    if (!data.password) {
      storeErrors("password", "Cant be blank");
      isValid = false;
    }
    if (!data.confirmPassword) {
      storeErrors("confirmPassword", "Cant be blank");
      isValid = false;
    }
    if (
      !!data.password &&
      !!data.confirmPassword &&
      data.confirmPassword !== data?.password
    ) {
      storeErrors("confirmPassword", "Password not matching");
      isValid = false;
    }
    return isValid;
  };

  const storeErrors = (name: string, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const resetErrors = () => {
    setErrors({
      email: null,
      password: null,
      confirmPassword: null,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    resetErrors();
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };
    if (!formValidation(formData)) {
      return;
    } else {
      // store data
      Signup({
        email: formData.email?.toString(),
        password: formData.password?.toString(),
      });
      history.push("/login");
    }
  };

  const handleInputChange = (e: any) => {
    setErrors({
      ...errors,
      [e.target.name]: null,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                required: true,
              }}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                required: true,
              }}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                required: true,
              }}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login">{"Already have a account? Sign In"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
