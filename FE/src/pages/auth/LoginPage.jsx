import React, { useState } from "react";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const handleChange = (updatedForm) => {
    setForm(updatedForm);
  };

  return (
    <>
      <div>
        <LoginForm form={form} setForm={setForm} onChange={handleChange} />
      </div>
    </>
  )
}

export default LoginPage;
