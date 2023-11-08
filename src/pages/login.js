import React, { useContext, useState } from "react";
import Image from "next/image";
import CustomHead from "@/components/customHead";
import EyeSlash from "@/icon/eye-slash";
import EyeIcon from "@/icon/eye";
import { LogoutApi, loginApi, registerApi } from "@/context/API store";
import axios from "axios";
import { FoodContext } from "@/context/FoodProvider";
import { useRouter } from "next/router";

function LoginPage() {
  const [login, setLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [nameAcc, setNameAcc] = useState("");
  const [emailAcc, setEmailAcc] = useState("");
  const [passAcc, setPassAcc] = useState("");
  const [confirmPassAcc, setConfirmPassAcc] = useState("");
  const [roleAcc, setRoleAcc] = useState("user");
  const [phoneAcc, setPhoneAcc] = useState("");
  const [profPictAcc, setProfPictAcc] = useState("");
  const [message, setMessage] = useState("");

  const { isLogin, setIsLogin, roleUser, setRoleUser, token, setToken } =
    useContext(FoodContext);

  const router = useRouter();

  const handleChangeForm = () => {
    setLogin(!login);
    setNameAcc("");
    setEmailAcc("");
    setPassAcc("");
    setMessage("");
  };

  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };

  const handleShowPassword2 = (event) => {
    event.preventDefault();
    setShowPass2(!showPass2);
  };

  const handleLoginAccount = async (event) => {
    event.preventDefault();
    setMessage("");
    setRoleUser("");
    setToken("");
    setIsLogin(false);
    const res = await loginApi(emailAcc, passAcc);
    if (res.code !== "200") {
      setMessage(res.message);
    } else {
      setRoleUser(res.user.role);
      setToken(res.token);
      setIsLogin(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.user.role);
        router.push("/");
      }
    }
  };

  function formatName(params) {
    const result = params.toLowerCase().split(" ");
    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1);
    }
    return result.join(" ");
  }

  const handleRegisterAccount = async (event) => {
    event.preventDefault();

    if (passAcc !== confirmPassAcc) {
      setMessage("Passwords do not match");
    } else if (phoneAcc.length > 12) {
      setMessage("Phone number is not valid");
    } else {
      try {
        setMessage("");
        const uploadedImageUrl = await handleUploadImage();

        if (uploadedImageUrl) {
          const res = await registerApi(
            formatName(nameAcc),
            emailAcc,
            passAcc,
            confirmPassAcc,
            roleAcc,
            uploadedImageUrl,
            phoneAcc
          );

          if (res.status !== 200) {
            setMessage(res.response.data.message);
          } else {
            setLogin(true);
            setEmailAcc("");
            setPassAcc("");
          }
        } else {
          setMessage("The profile picture field hasn't been filled out yet.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", profPictAcc);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/upload-image`,
        formData,
        {
          headers: {
            apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data.url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center h-screen w-full min-w-[600px] bg-black">
      <CustomHead title="Food Mania - Login Form" />
      <div className="flex flex-col w-[550px] p-8">
        <label
          htmlFor="check"
          className="bg-gray-100 text-white absolute top-2 w-40 h-10 rounded-full"
        >
          <input
            onClick={handleChangeForm}
            type="checkbox"
            id="check"
            className="sr-only peer"
            checked={login}
          />
          <span className="w-3/5 h-4/5 bg-blue-600 absolute rounded-3xl left-[8px] top-1 peer-checked:bg-rose-600 peer-checked:left-[56px] transition-all duration-500 grid place-items-center text-xl text-white">
            {login ? "Login" : "Register"}
          </span>
        </label>

        {/* Login Form */}
        {login && (
          <div className="text-white">
            <h1 className="text-6xl mb-2">Welcome Back!</h1>
            <h5 className="text-lg mb-14">
              Enter your Credentials to access your account
            </h5>
            <form className="w-full">
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">
                  E-mail Address
                </label>
                <input
                  type="email"
                  value={emailAcc}
                  className="bg-transparent border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                  placeholder="Enter Your E-mail"
                  onChange={(e) => setEmailAcc(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">
                  Password
                </label>
                <div className="flex justify-center items-center border rounded-lg">
                  <input
                    type={`${showPass ? "text" : "password"}`}
                    value={passAcc}
                    className="bg-transparent text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassAcc(e.target.value)}
                  />
                  <button className="w-8" onClick={handleShowPassword}>
                    {showPass ? (
                      <EyeIcon fill="#fff" width="20" height="20" />
                    ) : (
                      <EyeSlash fill="#fff" width="20" height="20" />
                    )}
                  </button>
                </div>
                <p className="text-red-600 text-center mt-2">{message}</p>
              </div>

              <button
                type="submit"
                className="text-white w-full border-2 rounded-xl py-2 bg-gray-700"
                onClick={handleLoginAccount}
              >
                Sign-in
              </button>
              <div className="mt-2 text-center">
                Don’t have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={handleChangeForm}
                >
                  Sign Up
                </span>
              </div>
            </form>
          </div>
        )}

        {/* Register Form */}
        {!login && (
          <div>
            <h1 className="text-6xl mb-8 mt-4">Get Started Now</h1>
            <form className="w-full text-white">
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">Name</label>
                <input
                  type="text"
                  value={nameAcc}
                  className="bg-transparent border border-gray-300 text-sm rounded-lg  block w-full p-2.5 focus:outline-none"
                  placeholder="Enter Your Name"
                  onChange={(e) => setNameAcc(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">
                  E-mail Address
                </label>
                <input
                  type="text"
                  value={emailAcc}
                  className="bg-transparent border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                  placeholder="Enter Your E-mail"
                  onChange={(e) => setEmailAcc(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium text-white">
                  Password
                </label>
                <div className="flex justify-center items-center border rounded-lg">
                  <input
                    type={`${showPass ? "text" : "password"}`}
                    value={passAcc}
                    className="bg-transparent text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassAcc(e.target.value)}
                  />
                  <button className="w-8" onClick={handleShowPassword}>
                    {showPass ? (
                      <EyeIcon fill="#fff" width="20" height="20" />
                    ) : (
                      <EyeSlash fill="#fff" width="20" height="20" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium text-white">
                  Confirm Password
                </label>
                <div className="flex justify-center items-center border rounded-lg">
                  <input
                    type={`${showPass2 ? "text" : "password"}`}
                    value={confirmPassAcc}
                    className="bg-transparent text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    placeholder="Enter Your Password"
                    onChange={(e) => setConfirmPassAcc(e.target.value)}
                  />
                  <button className="w-8" onClick={handleShowPassword2}>
                    {showPass2 ? (
                      <EyeIcon fill="#fff" width="20" height="20" />
                    ) : (
                      <EyeSlash fill="#fff" width="20" height="20" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneAcc}
                  className="bg-transparent border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                  placeholder="Enter Your Phone Number"
                  onChange={(e) => setPhoneAcc(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-xl font-medium">
                  Profile Picture
                </label>
                <input
                  type="file"
                  className="bg-transparent border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                  onChange={(e) => setProfPictAcc(e.target.files[0])}
                />
                <p className="text-red-600 text-center mt-2">{message}</p>
              </div>

              <button
                type="submit"
                className="text-white w-full border-2 rounded-xl py-2 bg-gray-700"
                onClick={handleRegisterAccount}
              >
                Sign-up
              </button>
              <div className="mt-2 text-center">
                Have an account?{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={handleChangeForm}
                >
                  Sign In
                </span>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="relative w-full h-full">
        <div className="absolute inset-0">
          <Image
            className="object-cover w-full h-full"
            src={"/food.jpg"}
            alt="Food Image Animation"
            layout="fill"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
