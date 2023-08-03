import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { login } from "../../store/authSlice"
import useLoginEmail from "../../hooks/useLoginEmail";
import kakao_login_img from "../../assets/images/kakao_login.png"

const LoginForm = ({ form, setForm }) => {
  const navigate = useNavigate();
  const { isValidEmail, setIsValidEmail, loginUser, validateEmail } = useLoginEmail();
  const [idModalIsOpen, setIdModalIsOpen] = useState(false);
  const [passModalIsOpen, setPassModalIsOpen] = useState(false);
  // 나중에 키값 입력할 것
  const API_KEY_KAKAO = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  // 로그인 후 연동될 주소
  const REDIRECT_URI_SITE = 'http://localhost/3000/login'
  // 카카오 로그인 버튼 클릭 시 카카오 로그인 페이지로 이동
  // 키 갱신 안하면 로그인 페이지는 뜨지만 로그인이 안됨
  const OAUTH_KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI_SITE+'kakao'}&response_type=code`

  const handleSignupPage = () => {
    navigate('/signup');
  };

  const sendLoginDataServer = async (e) => {
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
      await loginUser(loginData)
      navigate("/main");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    if (id === 'id') {
      setIsValidEmail(validateEmail(value));
    }
  };

  return (
    <div>
      <div>
        <div>
          로그인 페이지
        </div>
        <div>
          <form>
            <input
              id="id"
              type="email"
              placeholder="아이디"
              value={form.id}
              onChange={handleChange}
              required
            />
            {!isValidEmail && <div style={{ color: 'red' }}>올바른 이메일 형식이 아닙니다.</div>}
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button onClick={sendLoginDataServer}>
              로그인
            </button>
            <a href={OAUTH_KAKAO}>
              <img src={kakao_login_img} alt="카카오로 로그인" style={{height: '50%'}}/>
            </a>
          </form>
          <button onClick={handleSignupPage}>회원가입 페이지로</button>
        </div>
      </div>
      {/* 모달 창 */}
      <Modal isOpen={idModalIsOpen}>
        <div onClick={() => setIdModalIsOpen(false)}>아이디 형식이 잘못 되었습니다.</div>
      </Modal>
      <Modal isOpen={passModalIsOpen}>
        <div onClick={() => setPassModalIsOpen(false)}>비밀번호 길이는 4자 이상입니다.</div>
      </Modal>
    </div>
  );
};

export default LoginForm;
