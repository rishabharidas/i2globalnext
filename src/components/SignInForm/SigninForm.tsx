"use client";

import { Input, Button } from "@/components/DesignSystem/DesignSystem";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [errorText, setErrorText] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

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
      }
    }
  };

  const reRouteToSignUp = () => [router.push("/signup")];

  return (
    <>
      <form
        onSubmit={(e) => validateFields(e)}
        className="w-full md:w-2/5 flex justify-center"
      >
        <div className="mx-2 flex flex-col justify-center gap-6 border border-gray-400 rounded-lg p-4 py-4 min-w-[350px] min-h-[500px]">
          <span className="text-4xl w-full font-bold text-center">Sign In</span>
          <div className="w-full flex flex-col justify-between gap-6 ">
            <Input
              label="Email"
              type="email"
              id="signusername"
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
            <Input
              label="Password"
              type="password"
              id="signpassword"
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
                variant="outline"
                className="w-1/3"
                onClick={reRouteToSignUp}
                buttonText="Register"
              />

              <Button
                variant="contained"
                className="w-1/3"
                type="submit"
                buttonText="Sign In"
              />
            </div>
          </div>
          <span className="w-full flex items-center justify-center text-red-500 h-4">
            {errors.password || errors.email ? `${errorText}` : ""}
          </span>
        </div>
      </form>
    </>
  );
}
