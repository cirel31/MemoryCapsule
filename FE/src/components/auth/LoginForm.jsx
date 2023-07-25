import { AuthFormBlock, StyledInput, CustomButton, FormBody, WhiteBox } from "../../styles/loginStyle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const LoginForm = ({ form, setForm }) => {
  const navigate = useNavigate();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [idModalIsOpen, setIdModalIsOpen] = useState(false);
  const [passModalIsOpen, setPassModalIsOpen] = useState(false);

  const handleSignupPage = () => {
    navigate('/signup');
  };

  const sendLoginDataServer = (e) => {
    e.preventDefault();
    const sendId = form.id;
    const sendPass = form.password;
    let idCheck = false
    let passCheck = false
    if (sendId.length > 0 && isValidEmail) {
      idCheck = true
      console.log(sendId);
    } else {
      setIdModalIsOpen(true);
      idCheck = false
    }
    if (sendPass.length >= 4) {
      passCheck = true
      console.log(sendPass)
    } else {
      setPassModalIsOpen(true);
      passCheck = false
    }

    if (idCheck && passCheck) {
      const loginData = {
        id: sendId,
        password: sendPass,
      }
      // 실제 배포는 8000
      // 테스트 및 개발 서버는 7000
      axios.post("http://localhost:7000/login", loginData)
        .then((response) => {
          console.log(response.data)
          // JWT 토큰을 sessionStorage에 저장
          const jwtTokenFromServer = response.data.jwtToken;
          sessionStorage.setItem("jwtToken", jwtTokenFromServer);
        })
        .catch((error) => {
          console.error("로그인 에러 발생", error)
        })
      // 일단은 페이지 이동
      // 추후 세션에 데이터 존재 시에만 이동가능하게 수정 예정
      navigate("/main");
    }
  };

  const handleLoginData = () => {
    console.log('test');
  };

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

  return (
      <FormBody>
        <WhiteBox>
          <div>
            로그인 페이지
          </div>
          <AuthFormBlock>
            <form>
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
                  id="password"
                  type="password"
                  placeholder="비밀번호"
                  value={form.password}
                  onChange={handleChange}
                  required
              />
              <CustomButton style={{ marginTop: '1rem' }} onClick={sendLoginDataServer}>
                로그인
              </CustomButton>
              <CustomButton style={{ marginTop: '1rem', backgroundColor: 'yellow'}} onClick={handleLoginData}>
                카카오톡으로 로그인
              </CustomButton>
            </form>
            <button onClick={handleSignupPage}>회원가입 페이지로</button>
          </AuthFormBlock>
        </WhiteBox>
        {/* 모달 창 */}
        <Modal isOpen={idModalIsOpen}>
          <div style={{width:'100%', height:'100%'}} onClick={() => setIdModalIsOpen(false)}>아이디 형식이 잘못 되었습니다.</div>
        </Modal>
        <Modal isOpen={passModalIsOpen}>
          <div style={{width:'100%', height:'100%'}} onClick={() => setPassModalIsOpen(false)}>비밀번호 길이는 4자 이상입니다.</div>
        </Modal>
      </FormBody>
  );
};

export default LoginForm;
