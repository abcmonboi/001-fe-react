import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [payload, setPayLoad] = useState({
    email: "",
    password: "",
  });
  const [isShow, setIsShow] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const handleLogin = async () => {
    setIsLogging(true);
    if (payload.email === "" || payload.password === "") {
      toast.error("Email or password is empty");
      setIsLogging(false);
      return;
    }

    // let res = await loginApi(email.trim(), password.trim());
    //   {
    //     eve.holt@reqres.in
    //     cityslicka
    // }

    // if (res && res.token) {
    //   toast.success(`Welcome ${email}`);
    //   setIsLogging(false);
    //   loginContext(email.trim(), res.token);
    //   navigate("/");
    // } else {
    //   if (res && res.status === 400) {
    //     toast.error(res.data.error);
    //   } else {
    //     toast.error("Login failed");
    //   }
    //   setIsLogging(false);
    // }
  };
  return (
    <>
      <div className="login-container col-lg-8 col-sm-6  col-xl-4">
        <div className="title text-dark">Log in</div>
        <div className="text-dark">{"Email or username"}</div>
        <form>
        <input
          value={payload.email}
          onChange={(e) => {
            setPayLoad({
              ...payload,
              email: e.target.value,
            });
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              (payload?.email !== "" || payload?.password !== "" )
            ) {
              handleLogin();
            }
          }}
          placeholder="eve.holt@reqres.in"
          type="text"
          className="input w-100"
        />
        <div className="position-relative">
          <input
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                (payload?.email !== "" || payload?.password !== "" )
              ) {
                handleLogin();
              }
            }}
            value={payload.password}
            onChange={(e) => {
              setPayLoad({
                ...payload,
                password: e.target.value,
              });
            }}
            placeholder={"cityslicka"}
            type={isShow === false ? "password" : "text"}
            className="input w-100"
            autoComplete="true"
          />
          <i
            onClick={() => {
              setIsShow(!isShow);
            }}
            role="button"
            className={
              isShow
                ? "fa-solid fa-eye-slash eye-watch"
                : "fa-solid fa-eye eye-watch"
            }
          />
        </div>
       </form>
        <button
          disabled={payload?.email === "" || payload?.password === "" || isLogging}
          className="btn btn-dark mt-3 "
          onClick={() => {
            handleLogin();
          }}
        >
          {isLogging ? (
            <i className="fas fa-circle-notch fa-spin"></i>
          ) : (
            "Log in"
          )}
        </button>
        <div role="button" className="mt-5 text-center  text-dark ">
          <Link to="/" className="nav-link">
            <i className="fa-solid fa-house"></i>
            <span className="fw-semibold fs-6 ">
              <u> Home</u>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
