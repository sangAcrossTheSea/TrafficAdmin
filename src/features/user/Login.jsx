import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import InputPasswordText from "../../components/Input/InputPasswordText";
import axios from "axios";

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "admin12345",
    emailId: "admin@gmail.com",
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.emailId.trim() === "") return setErrorMessage("Phải có email");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Phải có mật khẩu");
    else {
      setLoading(true);
      // Call API to check user credentials and save token in localstorage
      try {
        const response = await axios.post("/login", {
          Email: loginObj.emailId,
          Password: loginObj.password,
        });
        localStorage.setItem("token", JSON.stringify(response.data));
        console.log("response", response.data);
        setLoading(false);
        if (response.data.isAdmin === false) {
          return setErrorMessage("Bạn không phải admin!");
        } else navigate("/");
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        return setErrorMessage("Sai email hoặc mật khẩu!");
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Đăng nhập
            </h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  type="emailId"
                  defaultValue={loginObj.emailId}
                  updateType="emailId"
                  containerStyle="mt-4"
                  labelTitle="Email"
                  updateFormValue={updateFormValue}
                />

                <InputPasswordText
                  defaultValue={loginObj.password}
                  // type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              {/* <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div> */}

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Login
              </button>

              {/* <div className="text-center mt-4">
                Don&apos;t have an account yet?
                <Link to="/register">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Register
                  </span>
                </Link>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
