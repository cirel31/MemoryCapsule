import SignupForm from "../../components/auth/SignupForm"
import {useState} from "react";
import signup_bg from "../../assets/images/signup/Sign_up.svg"
import "../../styles/SignUpPage.scss"
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
      <div className="signup_body">
        <img src={signup_bg} className="signup_back"/>
        <SignupForm form={form} setForm={setForm} onChange={handleChange} />
      </div>
    </>

  )
}

export default SignupPage;
