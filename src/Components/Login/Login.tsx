import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../Error/ErrorBoundary";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchLogin from "./fetchLogin";
import { FormLogin } from "../../Common/ApiResponseType";
const Login = () => {
  const navigate = useNavigate();
  const [loginCount, setLoginCount] = useState(0);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  console.log(loginCount);
  useQuery(["login", loginForm, loginCount], fetchLogin);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj: FormLogin = {
            email: formData.get("userName")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? "",
          };
          setLoginForm(obj);
          setLoginCount((count) => count + 1);
        }}
      >
        <label htmlFor="userName">
          Username:
          <input name="userName" type="text" id="userName" />
        </label>
        <label htmlFor="password">
          Password:
          <input name="password" type="text" id="password" />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
};
function LoginErrorBoundary() {
  return (
    <ErrorBoundary>
      <Login />
    </ErrorBoundary>
  );
}
export default LoginErrorBoundary;
