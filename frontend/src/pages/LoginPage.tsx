import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  AuthProvider,
  AppProvider,
  SignInPage,
  AuthResponse,
} from "@toolpad/core";
import { useAuthStore } from "../stores/AuthenticationStore";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();

  // navigate to home page and set login state
  const handleSuccessfulLogin = () => {
    // set state to true
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    // set admin logged in as false
    setIsLoggedIn(false);
  };

  const providers = [{ id: "credentials", name: "Email and Password" }];

  // callback function called on sign in
  const signIn: (
    provider: AuthProvider,
    formData?: FormData
  ) => Promise<AuthResponse> = async (_provider, formData) => {
    const promise = new Promise<AuthResponse>((resolve) => {
      const email = formData?.get("email");
      const password = formData?.get("password");

      // TODO change to actual backend server
      fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          // successful login
          if (response.ok) {
            handleSuccessfulLogin();
            resolve({});
          } else {
            // error during login
            resolve({
              type: "CredentialsSignin",
              error: "Invalid Credentials",
            });
          }
        })
        // network errors
        .catch(() => {
          resolve({
            type: "CredentialsSignin",
            error: "Network Error",
          });
        });
    });
    return promise;
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // conditionally render signIn page if not signed in
  return (
    <AppProvider theme={theme}>
      {isLoggedIn ? (
        // return logout page with button if signed in
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            gap: 30,
          }}
        >
          <Typography variant={isSmallScreen ? "h4" : "h2"} textAlign="center">
            Admin Currently Logged In
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </div>
      ) : (
        <SignInPage signIn={signIn} providers={providers} />
      )}
    </AppProvider>
  );
};

export default LoginPage;
