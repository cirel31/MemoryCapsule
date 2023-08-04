import {useNavigate} from "react-router-dom";
import {useState, useRef} from "react";
import Modal from "react-modal";
import useSignup from "../../hooks/useSignup";
import kokona from "../../assets/images/kokona.png"
import axios from "axios";
import {setUser} from "../../store/userSlice";
import Swal from "sweetalert2";

const SignupForm = ({ form, setForm,  }) => {
  const formRef = useRef(null)
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

  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    setImgFile(URL.createObjectURL(file));
  };

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
    // const loginForm = document.getElementById('loginForm')
    const signupURL = '/user/signup'
    const formData = new FormData(formRef.current);
    // const formData = new FormData(loginForm);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    if (
      (form.id.length > 0 && isValidEmail) &&
      (form.nickname.length > 1) &&
      (form.password === form.passwordCheck) &&
      isChecked
    ) {
      // get으로 서버에서 데이터 안받는 api 만들어보기
      axios.post(`${signupURL}`, formData, {
        headers : {
          "Content-Type": "multipart/form-data",
        }
      })
        .then(res => {
          console.log('회원가입 성공', res)
          navigate('/login')
        })
        .catch(err => {
          if (err.response && err.response.status === 409) {
            Swal.fire('경로가 잘못되었습니다.')
          }
          else if (err.response && err.response.status === 400) {
            Swal.fire('에러에러')
          }
          Swal.fire('서버에서 회원가입 실패')
          console.log('서버에서 회원가입 실패', err)
          console.log(err.response)
          for (const [key, value] of formData.entries()) {
            console.log(`끼야야야악 : ${key}: ${value}`);
          }
        })
    } else {
      console.log('데이터 오류', form.id.length, form.nickname.length, form.password )
    }
  }


  return (
    <div>
      <div>
        <div>
          회원가입 페이지
        </div>

        <div>
          <form onSubmit={sendSignupData} ref={formRef} id="loginForm">
             프로필 디폴트 이미지 변경 시 imgFile : 뒤의 값 변경
            <img
              src={imgFile ? imgFile:kokona}
              alt="프로필 이미지"
              style={{width:"100px"}}
            />
            <input
              name="file"
              type="file"
              accept="image/*"
              id="profileImg"
              onChange={saveImgFile}
              ref={imgRef}
            />
            <input
              name="email"
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
              name="nickName"
              type="text"
              value={form.nickname}
              onChange={handleChange}
              placeholder="닉네임"
              required
            />
            { ((form.nickname.length > 0) && (form.nickname.length < 2)) && <div>닉네임은 2글자 이상이어야 합니다.</div> }
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
              required
            />
            { ((form.password.length > 0) && (form.password.length < 4)) && <div>비밀번호는 4글자 이상이어야 합니다.</div> }
            <input
              id="passwordCheck"
              type="password"
              placeholder="비밀번호 확인"
              value={form.passwordCheck}
              onChange={handleChange}
              required
            />
            { !passwordChecking(form.password, form.passwordCheck) && <div>비밀번호가 일치하지 않습니다.</div> }
            <input
              id="phone"
              name="phone"
              type="number"
              placeholder="전화번호"
              required
            />
            <input
              id="name"
              name="name"
              type="text"
              placeholder="이름"
              required
            />
            <button onClick={policyPaper}>약관보기</button>
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckBoxChange}
              />
              약관에 동의합니다.
            </label>

            <button type="submit">
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

