import {AuthFormBlock, StyledInput, CustomButton, FormBody, WhiteBox} from "../../styles/loginStyle";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Modal from "react-modal";
import axios from "axios";

const SignupForm = ({ form, setForm,  }) => {
  const navigate = useNavigate()
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [policyModalIsOpen, setPolicyModalIsOpen] = useState(false)
  const handleLoginPage = () => {
    navigate('/login')
  }
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };
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
  const passwordChecking = () => {
    const pw1 = form.password
    const pw2 = form.passwordCheck
    return pw1 === pw2;
  }
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckBoxChange = (event) => {
    setIsChecked(event.target.checked);
  }
  const sendSignupDataServer = (e) => {
    e.preventDefault()
    console.log(form.id, form.nickname, form.password, form.passwordCheck, isChecked)
    const signupData = {
      id: form.id,
      nickname: form.nickname,
      password: form.password,
    }
    if ((form.id.length > 0 && isValidEmail) && (form.nickname.length > 1) && (form.password === form.passwordCheck) && isChecked) {
      // 실제 배포는 8000
      // 테스트 및 개발 서버는 7000
      axios.post("http://localhost:7000/signup", signupData)
        .then((response) => {
          console.log(response.data)
          const loginData = {
            id: form.id,
            password: form.password,
          }
          axios.post("http://localhost:7000/login", loginData)
            .then((response) => {
              console.log(response.data)
              const jwtTokenFromServer = response.data.jwtToken;
              sessionStorage.setItem("jwtToken", jwtTokenFromServer);
              navigate("/main");
            })
            .catch((error) => {
              console.error("로그인 에러 발생", error)
            })
        })
        .catch((error) => {
          console.error("회원가입 에러 발생", error)
        })
      navigate("/main");
    }
  }


  return (
    <FormBody>
      <WhiteBox>
        <div>
          회원가입 페이지
        </div>
        <AuthFormBlock>
          <form >
            <StyledInput
              id="id"
              type="email"
              placeholder="아이디"
              value={form.id}
              onChange={handleChange}
              required
            />
            {!isValidEmail && <div style={{ color: 'red' }}>올바른 이메일 형식이 아닙니다.</div>}
            <StyledInput
              id="nickname"
              type="text"
              value={form.nickname}
              onChange={handleChange}
              placeholder="닉네임"
              required
            />
            { ((form.nickname.length > 0) && (form.nickname.length < 2)) && <div style={{ color: 'red' }}>닉네임은 2글자 이상이어야 합니다.</div> }
            <StyledInput
              id="password"
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
              required
            />
            { ((form.password.length > 0) && (form.password.length < 5)) && <div style={{ color: 'red' }}>비밀번호는 4글자 이상이어야 합니다.</div> }
            <StyledInput
              id="passwordCheck"
              type="password"
              placeholder="비밀번호 확인"
              value={form.passwordCheck}
              onChange={handleChange}
              required
            />
            { !passwordChecking() && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div> }
            <button onClick={policyPaper} style={{ marginTop: '0.5rem' }}>약관보기</button>
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckBoxChange}
              />
              약관에 동의합니다.
            </label>

            <CustomButton style={{ marginTop: '1rem' }} onClick={sendSignupDataServer}>
              회원가입
            </CustomButton>
          </form>
          <button onClick={handleLoginPage} style={{ marginTop: '0.5rem' }}>로그인페이지로</button>
        </AuthFormBlock>
      </WhiteBox>
      <Modal isOpen={policyModalIsOpen}>
        <div style={{width:'100%', height:'100%'}} onClick={() => setPolicyModalIsOpen(false)}>
          회원 가입 약관 페이지
          본 과정은 삼성 청년 소프트웨어 아카데미(SSAFY)
          의 일환으로 만들어진 것입니다.
        </div>
      </Modal>
    </FormBody>

  )
}

export default SignupForm;

