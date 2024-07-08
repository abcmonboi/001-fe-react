import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../services/UserServices";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Login = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);

  const [payload, setPayLoad] = useState({
    email: "",
    password: "",
  });
  const [isShow, setIsShow] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");
    if (token && email) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const handleLogin = async () => {
    setIsLogging(true);
    if (payload.email === "" || payload.password === "") {
      toast.error("Email or password is empty");
      setIsLogging(false);
      return;
    }
    //trim email and password before sending to the server
    let res = await loginApi({
      email: payload.email.trim(),
      password: payload.password.trim(),
    });

    //   {
    //     eve.holt@reqres.in
    //     cityslicka
    // }

    if (res && res.token) {
      // localStorage.setItem("token", res.token);
      toast.success(`Welcome ${payload.email}`);
      setIsLogging(false);
      loginContext(payload?.email.trim(), res.token);
      navigate("/");
    } else {
      console.log(res);
      if (res && res.status === 400) {
        toast.error(res.data.error);
      } else {
        toast.error("Login failed");
      }
      setIsLogging(false);
    }
  };
  return (
    <>
      <div className="login-container col-lg-8 col-sm-6  col-xl-4">
        <div className="title text-dark">Log in</div>
        <div className="text-dark">
          <p className="font-weight-bold">
            Email or username (eve.holt@reqres.in)
          </p>
        </div>
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
                (payload?.email !== "" || payload?.password !== "")
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
                  (payload?.email !== "" || payload?.password !== "")
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
          disabled={
            payload?.email === "" || payload?.password === "" || isLogging
          }
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
