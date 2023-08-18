import {findPassThunk} from "../../store/userSlice";
import {useRef} from "react";
import {useDispatch} from "react-redux";
import "../../styles/FindPasswordPage.scss"
import findpw_bg from "../../assets/images/signup/Sign_up.svg"
import {useNavigate} from "react-router-dom";

import back_btn from "../../assets/images/signup/go_back.svg";
import axios from "axios";
import Swal from "sweetalert2";


const FindPassWordPage = ({ form, setForm }) => {
  const dispatch = useDispatch()
  const formRef = useRef(null)
  const navigate = useNavigate()
  const findPassword = ({email, phone}) => {
    const findData = {
      "email": email,
      "phone": phone,
    }
    axios.post(`https://i9a608.p.ssafy.io:8000/user/find_password`, findData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        Swal.fire({
          text: "임시 비밀번호가 발송되었습니다."
        })
      })
      .catch((error) => {
        if (error.response.status === 406 && error.response.data === "핸드폰 번호가 알맞지 않습니다.") {
          Swal.fire({
            text: "핸드폰 번호가 일치하지 않습니다.",
            icon: "error"
          })
        }
        else if (error.response.status === 406 && error.response.data === '카카오로 가입한 유저입니다.') {
          Swal.fire({
            text: error.response.data,
            icon: "warning"
          })
        }
      })
  }
  const sendFindPassData = async (e) => {
    e.preventDefault();
    
    const email =  formRef.current.querySelector('#email').value
    const phone = formRef.current.querySelector('#phone').value
    console.log('함수 실행', email, phone)
    findPassword({email, phone})
  };

  const handleLoginPage = () => {
    navigate('/login')
  }

  return (
    <>
      <div className="find_pw_body">

        <img src={findpw_bg} className="find_pw_back"/>

        <div className="find_pw_forms_body">
          <div className="pwforms_body_color">
            <h2>비밀번호 찾기</h2>
            <form ref={formRef}>
              <div className="pw_formset">
                <div className="pwforms_emailpart">
                  <label
                  >
                    ID
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="이메일"
                  />
                </div>
                <div className="pwforms_emailpart">
                  <label
                  >
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="전화번호"
                    inputMode="numeric"
                    required
                  />
                </div>
              </div>
              
              <button onClick={sendFindPassData}>재발급 받기</button>
            </form>
            <button onClick={handleLoginPage} className="back_button"><img src={back_btn}/></button>

          </div>
          
        </div>
       
      </div>
      
    </>
  )
}

export default FindPassWordPage