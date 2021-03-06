/**
 * Login to an account
 */

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import { ErrorText, Title, Link } from "../components/common/text/text";
import { InputField } from "../components/common/input/inputs";
import { loginUser } from "../store/user";
import { Button } from "../components/common/button/buttons";
import PageWrapper from "../components/common/PageWrapper";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    // validate credentials
    dispatch(loginUser(login));
    if (status === "succeeded") {
      history.push("/");
    }
  };

  const handleSignUp = () => {
    //navigte to register page
    history.push("/signup");
  };

  const handleChange = (e) => {
    //set user as loged in
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = (e) => {
    console.log("Oh NO!");
  };

  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center my-8">
        <Title title="Sign in to your account" />
        <span className="text-sm select-none">
          or&nbsp;
          <Link onClick={handleSignUp}>Create an account</Link>
        </span>
      </div>

      <div className="mx-auto bg-white w-80 rounded-md py-8 px-4 my-10">
        <div className="space-y-6 text-left">
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <InputField
              type="text"
              placeholder="Email"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username">Password</label>
            <InputField
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <Link onClick={handleForgotPassword} size="xs">
            Forgot Password?
          </Link>
          <ErrorText>{error || <div>&nbsp;</div>}</ErrorText>
          <Button size="sm" onClick={handleLogin}>
            {status === "loading" ? (
              <div className="flex flex-row justify-center items-center">
                <div className="animate-spin">
                  <ion-icon name="refresh-outline" />
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-center items-center gap-2">
                <ion-icon name="log-in-outline" />
                Login
              </div>
            )}
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
