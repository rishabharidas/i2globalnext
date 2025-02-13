"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { setCookie } from "@/app/action";

import { Button, Input } from "@/components/DesignSystem/DesignSystem";

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

  const validateFields = async (e: FormEvent<HTMLFormElement>) => {
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
      return;
    } else {
      await setCookie("email", loginDetails.email);
      await setCookie("password", loginDetails.password);
      await setCookie("username", loginDetails.username);
      router.push("/signin");
    }
  };

  const reRouteToSignIn = () => router.push("/signin");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form
        onSubmit={(e) => validateFields(e)}
        className="w-full md:w-2/5 flex justify-center"
      >
        <div className="mx-2 flex flex-col justify-around gap-6 border border-gray-400 rounded-lg p-4 py-6 min-w-[350px] min-h-[500px]">
          <span className="text-4xl w-full font-bold text-center">Sign Up</span>
          <div className="w-full flex flex-col justify-between gap-6 ">
            <Input
              label="Username"
              autoFocus
              type="text"
              required
              error={errors.username}
              name="username"
              value={loginDetails.username}
              onChange={handleInputChange}
            />
            <Input
              label="Email"
              type="email"
              required
              error={errors.email}
              name="email"
              value={loginDetails.email}
              onChange={handleInputChange}
            />
            <Input
              label="Password"
              type="password"
              required
              error={errors.password}
              name="password"
              value={loginDetails.password}
              onChange={handleInputChange}
            />
            <Input
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
                variant="outline"
                className="w-1/3"
                onClick={reRouteToSignIn}
                buttonText="Sign In"
              />
              <Button
                variant="contained"
                className="w-1/3"
                type="submit"
                buttonText="Register"
              />
            </div>
          </div>
          <span className="w-full flex items-center justify-center text-red-500 h-11 text-center">
            <span className="max-w-60 text-wrap">
              {Object.values(errors).length ? `${errorText}` : ""}
            </span>
          </span>
        </div>
      </form>
    </>
  );
}
