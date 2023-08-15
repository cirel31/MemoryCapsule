import {Link, useNavigate} from "react-router-dom";
import useLoginEmail from "../../hooks/useLoginEmail";
import kakao_login_img from "../../assets/images/home/kakaotalk_logo.svg"
import Swal from "sweetalert2";

const LoginForm = ({ form, setForm }) => {

  const navigate = useNavigate();
  const { isValidEmail, setIsValidEmail, loginUser, validateEmail } = useLoginEmail();

  const API_KEY_KAKAO = '50389ab406794f10677cfc8b7e3bcf4d'

  const REDIRECT_URI_SITE = 'https://memorycapsule.site/login/kakao'
  const OAUTH_KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI_SITE}&response_type=code`;
  
  
  const handleSignupPage = () => {
    navigate('/signup');
  };
  
  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
    });
  };
  
  const sendLoginDataServer = async (e) => {
    e.preventDefault();
    const sendId = form.id;
    const sendPass = form.password;

    if (sendId.length === 0 || !isValidEmail) {
      showAlert("Error", "아이디 형식이 잘못 되었습니다.", "error");
      return;
    }

    if (sendPass.length < 4) {
      showAlert("Error", "비밀번호 길이는 4자 이상입니다.", "error");
      return;
    }

    const loginData = {
      email: sendId,
      password: sendPass,
    };
    await loginUser(loginData);
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
                placeholder="e-mail"
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
              <div>
                <Link to="/find-password" className="find_pw">
                  비밀번호 찾기
                </Link>
              </div>

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
      <div>
        {/*<Modal isOpen={idModalIsOpen}>*/}
        {/*  <div >아이디 형식이 잘못 되었습니다.</div>*/}
        {/*</Modal>*/}
      </div>
      <div>
        {/*<Modal isOpen={passModalIsOpen}>*/}
        {/*  <div >비밀번호 길이는 4자 이상입니다.</div>*/}
        {/*</Modal>*/}
      </div>
    </div>
  );
};

export default LoginForm;
