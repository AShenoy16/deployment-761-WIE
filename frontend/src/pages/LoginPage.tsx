import React from "react";
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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginPage: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const [isLogInAndOutAlert, setIsLogInAndOutAlert] =
    React.useState<boolean>(false);

  const handleSuccessfulLogin = () => {
    // set login to true
    setIsLoggedIn(true);
    showAlert();
  };

  const handleLogOut = () => {
    // set admin logged in as false
    setIsLoggedIn(false);
    showAlert();
  };

  // show the login/logout alert
  const showAlert = () => {
    setIsLogInAndOutAlert(true);

    // Hide loging/logout snackbar and alert after 1 second
    setTimeout(() => {
      setIsLogInAndOutAlert(false);
    }, 1000);
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

  // conditionally render signIn page if not signed in otherwise logout button
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
      <Snackbar
        // snackbar and alerts to notify admin about login/logout state
        open={isLogInAndOutAlert}
        autoHideDuration={1000}
        message="Note archived"
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {isLoggedIn ? "Successfully Logged In" : "Successfully Logged Out"}
        </Alert>
      </Snackbar>
    </AppProvider>
  );
};

export default LoginPage;
