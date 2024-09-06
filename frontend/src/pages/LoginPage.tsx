import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  AuthProvider,
  AppProvider,
  SignInPage,
  AuthResponse,
} from "@toolpad/core";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // navigate to home page
  const handleSuccessfulLogin = () => {
    // set state to true
    navigate("/");
  };

  const providers = [{ id: "credentials", name: "Email and Password" }];

  const signIn: (
    provider: AuthProvider,
    formData?: FormData
  ) => Promise<AuthResponse> = async (_provider, formData) => {
    const promise = new Promise<AuthResponse>((resolve) => {
      const email = formData?.get("email");
      const password = formData?.get("password");

      fetch("http://localhost:5000/api/users", {
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

  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
};

export default LoginPage;
