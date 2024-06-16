import React, { ChangeEvent, useState } from "react";
import Input from "~/components/input";

import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

import { authenticator } from "~/api/auth.server";
import { Form, json, useActionData } from "@remix-run/react";
import { Logo } from "~/components";

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export async function action({ request }: ActionFunctionArgs) { 
  // let email = formData.get("email")?.toString()
  // let password = formData.get("password")?.toString()

  // if (!(email == "admin@integrations.com" )&& !(password == "Welcome@123")) {
  //   console.log("Hello")
  //   return json({ error: true, message: "Invalid credentials." });
  // }
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/courses",
    failureRedirect: "/login",
  });
  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure

}
export async function loader({ request }: LoaderFunctionArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/courses",
  });
}
const Login = () => {
  const actionData = useActionData<{ error: boolean, message: string }>()
  const [userDate, setUserDate] = useState({ userName: "", password: "" });

  const { userName, password } = userDate;

  const onChangeEmailHanler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserDate((preData) => {
      return { ...preData, userName: e.target.value };
    });
  };

  const onChangePasswordHanler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserDate((preData) => {
      return { ...preData, password: e.target.value };
    });
  };

  return (
    <Form
      className="flex p-10 gap-5 flex-col min-w-96 rounded-xl"
      method="POST"
    >
      <div className="relative self-center align-middle flex items-center justify-center">
        <Logo/>
        {/* <span className="absolute top-0 bottom-0 w-full h-full bg-gray-900 rounded-xl rotate-45"></span>
        <span className="absolute text-white font-extrabold text-5xl self-center font-permanent_marker">
          M
        </span> */}
      </div>
      <span className="self-center font-semibold tracking-widest text-lg uppercase mt-6">
        Login
      </span>
      <Input
        lable="email"
        required
        type="email"
        // helperText="Email is required.!"
        value={userName}
        onChangeHandler={onChangeEmailHanler}
      />
      <Input
        lable="password"
        required
        type="password"
        value={password}
        onChangeHandler={onChangePasswordHanler}
      />
      <a className="self-end">Forgot Password?</a>
      {actionData?.error ? <p className="text-red-600">{actionData.message}</p> : null}
      <button className="bg-gray-900 rounded-lg p-2.5 text-white my-2">
        Login
      </button>
      <span className="self-center">
        Don't have an account yet?
        <a className="self-"> Sign Up</a>
      </span>
    </Form>
  );
};

export default Login;
