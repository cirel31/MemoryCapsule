import SignupForm from "../components/auth/SignupForm"
import {useState} from "react";

const SignupPage = () => {
  const [form, setForm] = useState({
    id: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  const handleChange = (updatedForm) => {
    setForm(updatedForm);
  };

  return (
    <>
      <div>
        <SignupForm form={form} setForm={setForm} onChange={handleChange} />
      </div>
    </>

  )
}

export default SignupPage;
