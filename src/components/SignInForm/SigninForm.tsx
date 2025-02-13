"use client";

import { Button, Snackbar, TextField, Alert, Box } from "@mui/material";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [errorText, setErrorText] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const [showSnackbar, setShowSnackbar] = useState(false);

  const validateFields = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { email: false, password: false };

    if (typeof window !== "undefined") {
      const storedEmail = document.cookie
        .split("; ")
        .find((row) => row.startsWith("email="))
        ?.split("=")[1];
      const storedPassword = document.cookie
        .split("; ")
        .find((row) => row.startsWith("password="))
        ?.split("=")[1];

      if (
        loginDetails.email === storedEmail &&
        loginDetails.password === storedPassword
      ) {
        document.cookie = "loggedin=true";
        router.push("/");
      } else {
        newErrors.email = true;
        newErrors.password = true;

        setErrors(newErrors);
        setErrorText("Invalid email or password.");
        setShowSnackbar(true);
      }
    }
  };

  const reRouteToSignUp = () => [router.push("/signup")];

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={(e) => validateFields(e)}
        className="w-full md:w-2/5 flex justify-center"
      >
        <div className="mx-2 flex flex-col justify-center gap-6 border border-gray-400 rounded-lg p-4 py-4 min-w-[350px] min-h-[500px]">
          <span className="text-4xl w-full font-bold text-center">Sign In</span>
          <div className="w-full flex flex-col justify-between gap-6 ">
            <TextField
              label="Email"
              type="email"
              required
              error={errors.email}
              value={loginDetails.email}
              onChange={(e) =>
                setLoginDetails((prev) => {
                  return {
                    ...prev,
                    email: e.target.value,
                  };
                })
              }
            />
            <TextField
              label="Password"
              type="password"
              required
              error={errors.password}
              value={loginDetails.password}
              onChange={(e) =>
                setLoginDetails((prev) => {
                  return {
                    ...prev,
                    password: e.target.value,
                  };
                })
              }
            />
            <div className="flex justify-center gap-3">
              <Button
                variant="outlined"
                className="w-1/3"
                onClick={reRouteToSignUp}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Register
              </Button>
              <Button
                variant="contained"
                className="w-1/3"
                type="submit"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Signin
              </Button>
            </div>
          </div>
          {/* <span className="text-sm text-gray-500 text-center -mt-3">
            {"Use demo account to Sigin"}
          </span> */}
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
          severity={Object.values(errors).includes(true) ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorText}
        </Alert>
      </Snackbar>
    </>
  );
}
