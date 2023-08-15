import {useNavigate} from "react-router-dom";
import {useState, useRef} from "react";
import Modal from "react-modal";
import useSignup from "../../hooks/useSignup";
import defaultimg from "../../assets/images/stamp/stamp_best.svg"
import axios from "axios";
import {setUser} from "../../store/userSlice";
import photo_picto from "../../assets/images/signup/upload.svg"
import Swal from "sweetalert2";
import goback_btn from "../../assets/images/signup/go_back.svg";

const SignupForm = ({ form, setForm,  }) => {
  const formRef = useRef(null)
  const navigate = useNavigate()
  const [policyModalIsOpen, setPolicyModalIsOpen] = useState(false)
  const [isAuthentication, setIsAuthentication] = useState(false)
  const {
    isChecked,
    isValidEmail,
    setIsValidEmail,
    validateEmail,
    handleCheckBoxChange,
    passwordChecking,
  } = useSignup()

  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();
  
  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const signupURL = '/user/signup'
  const authorizationURL = '/user/emailCheck?user_email='
  const deletedCheck = '/user/deletedEmailCheck?user_email='
  
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
    const emailInput = Swal.mixin({
      input: 'email',
      confirmButtonText: '이메일 중복 확인',
      showCancelButton: true,
      cancelButtonText: '닫기',
      inputAttributes: {
        placeholder: 'example@example.com',
        name: 'email',
        id: 'id'
      },
      inputValidator: (value) => {
        if (!value) {
          return '이메일을 입력해주세요!';
        }
      }
    });
    emailInput.fire({
      title: '사용할 이메일을 입력해주세요.'
    }).then((result) => {
      if (result.isConfirmed) {
        form.id = result.value
        authorizeEmail(result.value)
      }
    });
  }

  const authorizeEmail = async (emailData) => {
    try {
      const response = await axios.post(`${baseURL}${authorizationURL}${emailData}`);
      if (response?.status === 209) {
        const result = await Swal.fire({
          text: response.data,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: '확인',
          cancelButtonText: '취소'
        });

        if (result.isConfirmed) {
          await handleDeletedCheck(emailData);
        } else {
          console.log('취소 버튼 클릭!');
        }
      } else {
        setEmailSuccess(response);
      }
    } catch (error) {
      handleErrorResponse(error);
    }
  }

  const handleDeletedCheck = async (emailData) => {
    try {
      const response = await axios.post(`${baseURL}${deletedCheck}${emailData}`);
      setEmailSuccess(response);
    } catch (error) {
      handleErrorResponse(error);
    }
  }

  const setEmailSuccess = (response) => {
    const validationCode = response.data
    Swal.fire({
      text: "사용 가능한 이메일입니다.",
      icon: "info",
      focusConfirm: false,
      confirmButtonText: '확인',
    })
      .then((result) => {
        emailAuthentication(validationCode)
      })
  }

  const handleErrorResponse = (error) => {
    if (error.response?.status === 406) {
      Swal.fire(error.response.data.message);
    } else {
      console.log(error);
    }
  }
  const emailAuthentication = (validationCode) => {
    Swal.fire({
      title: "인증 코드를 입력해주세요.",
      html: `
        <input type="text" id="authenticationCode" class="swal2-input" placeholder="인 증 코 드">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      preConfirm: () => {
        let authenticationCode = document.getElementById('authenticationCode').value;
        return {
          authenticationCode: authenticationCode,
        };
      }
    })
      .then((result) => {
        if (result.isConfirmed) {
          const authenticationCode = result.value.authenticationCode
          if (validationCode === authenticationCode) {
            Swal.fire("이메일 인증에 성공하였습니다.")
            setIsAuthentication(true)
          } else {
            Swal.fire("입력하신 코드가 올바르지 않습니다.")
          }
        }
      })
  }

  const sendSignupData = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current);

    if (
      (form.id.length > 0 && isValidEmail) &&
      (form.nickname.length > 1) &&
      (form.password === form.passwordCheck) &&
      isChecked &&
      isAuthentication
    ) {
      axios.post(`${baseURL}${signupURL}`, formData, {
        headers : {
          "Content-Type": "multipart/form-data",
        }
      })
        .then(() => {
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
        })
    } else {
      console.log('데이터 오류')
    }
  }
  
  Modal.setAppElement("#root");
  
  return (
    <div className="signup_forms_body">
      <div className="forms_body_color">
        <h1>Sign in</h1>

        <div className="form_set">
          <form onSubmit={sendSignupData} ref={formRef} id="loginForm">
            <div className="imgupload">
              <img
                src={imgFile ? imgFile:defaultimg}
                alt="프로필 이미지"
              />
              <input
                name="file"
                type="file"
                accept="image/*"
                id="profileImg"
                onChange={saveImgFile}
                ref={imgRef}
              />
              <label htmlFor="profileImg">
                <img src={photo_picto}/><p>사진 올리기</p>
              </label>
            </div>
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
                  readOnly={isAuthentication}
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
    </div>

  )
}

export default SignupForm;

