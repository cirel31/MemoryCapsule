import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Modal from "react-modal";
import useSignup from "../../hooks/useSignup";

const SignupForm = ({ form, setForm,  }) => {
  const navigate = useNavigate()
  const [policyModalIsOpen, setPolicyModalIsOpen] = useState(false)
  const {
    isChecked,
    isValidEmail,
    setIsValidEmail,
    validateEmail,
    handleCheckBoxChange,
    passwordChecking,
    sendSignupDataServer,
  } = useSignup()
  const handleLoginPage = () => {
    navigate('/login')
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    if (id === 'id') {
      setIsValidEmail(validateEmail(value));
    }
  };
  const policyPaper = (e) => {
    e.preventDefault();
    setPolicyModalIsOpen(true);
  }
  const sendSignupData = (e) => {
    e.preventDefault()
    console.log(form.id, form.nickname, form.password, form.passwordCheck, isChecked)
    const signupData = {
      id: form.id,
      nickname: form.nickname,
      password: form.password,
    }
    if (
      (form.id.length > 0 && isValidEmail) &&
      (form.nickname.length > 1) &&
      (form.password === form.passwordCheck) &&
      isChecked
    ) {
      sendSignupDataServer(signupData)
      navigate("/main");
    }
  }


  return (
    <div>
      <div>
        <div>
          회원가입 페이지
        </div>
        <div>
          <form >
            <input
              id="id"
              type="email"
              placeholder="아이디"
              value={form.id}
              onChange={handleChange}
              required
            />
            {!isValidEmail && <div>올바른 이메일 형식이 아닙니다.</div>}
            <input
              id="nickname"
              type="text"
              value={form.nickname}
              onChange={handleChange}
              placeholder="닉네임"
              required
            />
            { ((form.nickname.length > 0) && (form.nickname.length < 2)) && <div>닉네임은 2글자 이상이어야 합니다.</div> }
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
              required
            />
            { ((form.password.length > 0) && (form.password.length < 5)) && <div>비밀번호는 4글자 이상이어야 합니다.</div> }
            <input
              id="passwordCheck"
              type="password"
              placeholder="비밀번호 확인"
              value={form.passwordCheck}
              onChange={handleChange}
              required
            />
            { !passwordChecking() && <div>비밀번호가 일치하지 않습니다.</div> }
            <button onClick={policyPaper}>약관보기</button>
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckBoxChange}
              />
              약관에 동의합니다.
            </label>

            <button style={{ marginTop: '1rem' }} onClick={sendSignupData}>
              회원가입
            </button>
          </form>
          <button onClick={handleLoginPage}>로그인페이지로</button>
        </div>
      </div>
      <Modal isOpen={policyModalIsOpen}>
        <div onClick={() => setPolicyModalIsOpen(false)}>
          회원 가입 약관 페이지

          본 과정은 삼성 청년 소프트웨어 아카데미(SSAFY)의 일환으로 만들어진 것입니다.
        </div>
      </Modal>
    </div>

  )
}

export default SignupForm;

