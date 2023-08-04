import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { login } from "../../store/authSlice"
import useLoginEmail from "../../hooks/useLoginEmail";
import kakao_login_img from "../../assets/images/home/kakaotalk_logo.svg"

const LoginForm = ({ form, setForm }) => {
  const navigate = useNavigate();
  const { isValidEmail, setIsValidEmail, loginUser, validateEmail } = useLoginEmail();
  const [idModalIsOpen, setIdModalIsOpen] = useState(false);
  const [passModalIsOpen, setPassModalIsOpen] = useState(false);
  // 나중에 키값 입력할 것
  const API_KEY_KAKAO = '1af0163235ced24b3f4bc66a23b24509'
  // 로그인 후 연동될 주소
  const REDIRECT_URI_SITE = 'http://i9a608.p.ssafy.io:8000/login/oauth2/code/'
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
        email: sendId,
        password: sendPass,
      }
      await loginUser(loginData)
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
    <div className="login_forms_body">
      <div>
        <div>

        </div>
        <div className="forms_set_layout">
          <form>
            <div >
              <input
                id="id"
                type="email"
                placeholder="아이디"
                value={form.id}
                onChange={handleChange}
                required
              />

              <input
                id="password"
                type="password"
                placeholder="비밀번호"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button onClick={sendLoginDataServer}>
                로그인
              </button>
            </div>


          </form>

          <div>
            <button onClick={handleSignupPage}>회원가입 페이지로</button>
            <a href={OAUTH_KAKAO}>
              <div >
                <p>카카오톡으로 로그인</p>
                <img src={kakao_login_img}/>
              </div>

            </a>

          </div>
          {!isValidEmail && <div className="login_alert">올바른 이메일 형식이 아닙니다.</div>}

        </div>
      </div>
      {/* 모달 창 */}
      <div onClick={() => setIdModalIsOpen(false)}>
        <Modal isOpen={idModalIsOpen}>
          <div >아이디 형식이 잘못 되었습니다.</div>
        </Modal>
      </div>
      <div onClick={() => setPassModalIsOpen(false)}>
        <Modal isOpen={passModalIsOpen}>
          <div >비밀번호 길이는 4자 이상입니다.</div>
        </Modal>
      </div>
    </div>
  );
};

export default LoginForm;
