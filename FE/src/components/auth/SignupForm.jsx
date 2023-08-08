import {useNavigate} from "react-router-dom";
import {useState, useRef} from "react";
import Modal from "react-modal";
import useSignup from "../../hooks/useSignup";
import kokona from "../../assets/images/kokona.png"
import axios from "axios";
import {setUser} from "../../store/userSlice";
import Swal from "sweetalert2";
import goback_btn from "../../assets/images/signup/go_back.svg";

const SignupForm = ({ form, setForm,  }) => {
  const formRef = useRef(null)
  const navigate = useNavigate()
  const [policyModalIsOpen, setPolicyModalIsOpen] = useState(false)
  const [emailModalIsOpen, setEmailModalIsOpen] = useState(false)
  const [emailChecking, setEmailChecking] = useState(false)
  const [isAuthentication, setIsAuthentication] = useState(false)
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
  
  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const signupURL = '/user/signup'
  const authorizationURL = ''
  
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
  const emailCheckPaper = (e) => {
    e.preventDefault();
    setEmailModalIsOpen(true);
  }
  const emailCheckServer = (e) => {
    e.preventDefault()
    console.log(form.id)
    const emailData = form.id
    setEmailChecking(true)
    Swal.fire("사용 가능한 이메일입니다.")
    
    
    // axios.post(`${baseURL}${authorizationURL}`, emailData)
    //   .then((response) => {
    //     console.log("이메일 사용 가능:", response)
    //     Swal.fire("사용 가능한 이메일입니다.")
    //     setEmailChecking(true)
    //   })
    //   .catch((error) => {
    //     console.log("이메일 존재 :", error)
    //     Swal.fire("이미 가입된 이메일입니다.")
    //   })
  }
  const emailAuthentication = (e) => {
    e.preventDefault()
    const authenticationCode = ''
    axios.post(`${baseURL}${authorizationURL}`, authenticationCode)
      .then((response) => {
        console.log("코드 인증 성공 : ", response)
        Swal.fire("이메일 인증에 성공하였습니다.")
        setIsAuthentication(true)
      })
      .catch((error) => {
        console.log("이메일 존재 : ", error)
        Swal.fire("입력하신 코드가 올바르지 않습니다.")
      })
  }

  const sendSignupData = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current);
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
      axios.post(`${baseURL}${signupURL}`, formData, {
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
            console.log(`왜 안 되 는 건 데.... : ${key}: ${value}`);
          }
        })
    } else {
      console.log('데이터 오류')
    }
  }


  return (
    <div className="signup_forms_body">
      <div className="forms_body_color">
        <h1>Sign in</h1>

        <div className="form_set">
          <form onSubmit={sendSignupData} ref={formRef} id="loginForm">
            {/* 프로필 디폴트 이미지 변경 시 imgFile : 뒤의 값 변경  */}
            {/*<img*/}
            {/*  src={imgFile ? imgFile:kokona}*/}
            {/*  alt="프로필 이미지"*/}
            {/*  style={{width:"100px"}}*/}
            {/*/>*/}
            {/*<input*/}
            {/*  name="imgUrl"*/}
            {/*  type="file"*/}
            {/*  accept="image/*"*/}
            {/*  id="profileImg"*/}
            {/*  onChange={saveImgFile}*/}
            {/*  ref={imgRef}*/}
            {/*/>*/}
            <div className="forms_namepart">
              <div className="name_part">
                <p>Name</p>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="이름"
                  required
                />
              </div>
              <div className="phonenumber_part">
                <p>Phone Number</p>
                <input
                  id="phone"
                  name="phone"

                  placeholder="전화번호"
                  inputMode="numeric"
                  required
                />
              </div>
            </div>

            <div className="forms_emailpart">
              <div className="email_part">
                <p>E-mail</p>
                <input
                  name="email"
                  id="id"
                  type="email"
                  placeholder="example@example.com"
                  value={form.id}
                  onClick={emailCheckPaper}
                  required
                />
              </div>

              <div className="nickname_part">
                <p>Nickname</p>
                <input
                  id="nickname"
                  name="nickName"
                  type="text"
                  value={form.nickname}
                  onChange={handleChange}
                  placeholder="닉네임"
                  required
                />
              </div>
            </div>

            <div className="forms_passwordpart">
              <p>Password</p>
              <div className="password_part">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <input
                  id="passwordCheck"
                  type="password"
                  placeholder="비밀번호 확인"
                  value={form.passwordCheck}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="signup_button_group">
              <div>
                <button onClick={policyPaper}>약관 보기</button>
                <label>
                  <p>약관에 동의합니다.</p>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckBoxChange}
                    id="custom"
                  />
                  <label htmlFor="custom" className="custumlabel"></label>
                </label>
              </div>
              <button type="submit">
                회원가입
              </button>
            </div>
          </form>
          <div className="signup_alert_id">
            {!isValidEmail && <p>올바른 이메일 형식이 아닙니다!</p>}
          </div>
          <div className="signup_alert_nickname">
            { ((form.nickname.length > 0) && (form.nickname.length < 2)) && <p>닉네임은 2글자 이상이어야 합니다!</p> }
          </div>
          <div className="signup_alert_password">
            { ((form.password.length > 0) && (form.password.length < 4)) && <p>비밀번호는 4글자 이상이어야 합니다!</p> }
            { ((form.passwordCheck.length > 0) && !passwordChecking(form.password, form.passwordCheck)) && <p>비밀번호가 일치하지 않습니다!</p> }
          </div>
          <button onClick={handleLoginPage} className="goback_button"><img src={goback_btn}/></button>
        </div>
      </div>
      <Modal isOpen={policyModalIsOpen}>
        <div onClick={() => setPolicyModalIsOpen(false)}>
          회원 가입 약관 페이지

          본 과정은 삼성 청년 소프트웨어 아카데미(SSAFY)의 일환으로 만들어진 것입니다.
        </div>
      </Modal>
      <Modal isOpen={emailModalIsOpen}>
        <div>
          <label>
            E-mail :
          </label>
          <input
            name="email"
            id="id"
            type="email"
            placeholder="example@example.com"
            value={form.id}
            onChange={handleChange}
          />
          <button onClick={emailCheckServer}>이메일 중복 확인</button>
        </div>
        {emailChecking &&
          <div>
            <label>인 증 코 드 : </label>
            <input
              type="text"
              value=""
            />
            <button onClick={emailAuthentication}>이메일 인증하기</button>
          </div>
        }
        
        <button onClick={() => setEmailModalIsOpen(false)}>닫기</button>
      </Modal>
      
      
    </div>

  )
}

export default SignupForm;

