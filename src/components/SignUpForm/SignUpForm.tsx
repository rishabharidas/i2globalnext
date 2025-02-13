"use client";

import { Button, Snackbar, TextField, Alert, Box } from "@mui/material";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorText, setErrorText] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [showSnackbar, setShowSnackbar] = useState(false);

  const validateFields = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
    };

    if (!loginDetails.username) {
      newErrors.username = true;
    }
    if (!loginDetails.email) {
      newErrors.email = true;
    }
    if (!loginDetails.password) {
      newErrors.password = true;
    }
    if (loginDetails.password !== loginDetails.confirmPassword) {
      newErrors.confirmPassword = true;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setErrorText(
        "Please fill in all required fields and ensure passwords match.",
      );
      setShowSnackbar(true);
      return;
    } else {
      if (typeof window !== "undefined") {
        document.cookie = `email=${loginDetails.email}`;
        document.cookie = `password=${loginDetails.password}`;
        document.cookie = `username=${loginDetails.username}`;
        router.push("/signin");
      }
    }
  };

  const reRouteToSignIn = () => router.push("/signin");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={(e) => validateFields(e)}
        className="w-full md:w-2/5 flex justify-center"
      >
        <div className="mx-2 flex flex-col justify-around gap-6 border border-gray-400 rounded-lg p-4 py-6 min-w-[350px]  min-h-[500px]">
          <span className="text-4xl w-full font-bold text-center">Sign Up</span>
          <div className="w-full flex flex-col justify-between gap-6 ">
            <TextField
              label="Username"
              type="text"
              required
              error={errors.username}
              name="username"
              value={loginDetails.username}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              type="email"
              required
              error={errors.email}
              name="email"
              value={loginDetails.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Password"
              type="password"
              required
              error={errors.password}
              name="password"
              value={loginDetails.password}
              onChange={handleInputChange}
            />
            <TextField
              label="Confirm Password"
              type="password"
              required
              error={errors.confirmPassword}
              name="confirmPassword"
              value={loginDetails.confirmPassword}
              onChange={handleInputChange}
            />

            <div className="flex justify-center gap-3">
              <Button
                variant="outlined"
                className="w-1/3"
                onClick={reRouteToSignIn}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                className="w-1/3"
                type="submit"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={
            Object.values(errors).some((error) => error) ? "error" : "info"
          }
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorText}
        </Alert>
      </Snackbar>
    </>
  );
}
