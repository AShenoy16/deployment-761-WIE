import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import {AuthProvider, AppProvider, SignInPage, AuthResponse } from '@toolpad/core';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccessfulLogin = () => {
    navigate("/");
  };

  const providers = [{ id: 'credentials', name: 'Email and Password' }];

  const signIn: (
    provider: AuthProvider,
    formData?: FormData,
    callbackUrl?: string
  ) => Promise<AuthResponse> | void = async (provider, formData, callbackUrl) => {
    const promise = new Promise<AuthResponse>((resolve) => {
      setTimeout(() => {
        const email = formData?.get('email');
        const password = formData?.get('password');
        alert(
          `Signing in with "${provider.name}" and credentials: ${email}, ${password}`,
        );
        redirectTo: callbackUrl
        // preview-start
        resolve({
          type: 'CredentialsSignin',
          error: 'Invalid Credentials'
        });

        handleSuccessfulLogin()
        // preview-end
      }, 300);
    });
    return promise;
  };


  const theme = useTheme();

  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers}/>
    </AppProvider>
  );
};

export default LoginPage;
