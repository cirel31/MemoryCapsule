import React, {useEffect, useState} from "react";
import LoginForm from "../../components/auth/LoginForm";
import login_bg from "../../assets/images/home/login_background.svg"
import "../../styles/Login_Out_Style.scss"
import {useNavigate} from "react-router-dom";
const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const loginCheck = !!sessionStorage.getItem("accessToken")
    setIsLoggedIn(loginCheck)
    if (isLoggedIn) {
      navigate('/main')
    }
  })
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const handleChange = (updatedForm) => {
    setForm(updatedForm);
  };

  return (
    <>
      <div className="login_body">

        <img src={login_bg} className="login_page"/>

        <div className="login_forms">
          <h1>Login</h1>
          <LoginForm form={form} setForm={setForm} onChange={handleChange} />

        </div>
      </div>
    </>
  )
}

export default LoginPage;
