import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Login } from "../service/AuthService";
import { EMAIL_VALIDATION_REGEX } from "../utils/constants";

const defaultTheme = createTheme();

export default function SignIn({ history }: any) {
  const [errors, setErrors] = React.useState<{
    email: string | null;
    password: string | null;
  }>({
    email: null,
    password: null,
  });
  const formValidation = (data: { email: any; password: any }) => {
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
    });
  };

  const handleInputChange = (e: any) => {
    setErrors({
      ...errors,
      [e.target.name]: null,
    });
  };

  const handleSubmit = (event: any) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    resetErrors();
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    debugger;
    if (!formValidation(formData)) {
      return;
    } else {
      // store data
      if (Login(formData)) {
        history.push("/");
      }
    }
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
            Sign in
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
                <Link to="/sign-up">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
