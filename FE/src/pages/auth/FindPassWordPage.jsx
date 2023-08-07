import {findPassThunk} from "../../store/userSlice";
import {useRef} from "react";
import {useDispatch} from "react-redux";
const FindPassWordPage = ({ form, setForm }) => {
  const dispatch = useDispatch()
  const formRef = useRef(null)
  const findPassword = async ({email, phone}) => {
    try {
      await dispatch(findPassThunk({email, phone}));
      console.log({email, phone})
    } catch (err) {
      console.error("패스워드 탐색 에러 발생", err);
    }
  }
  const sendFindPassData = async (e) => {
    e.preventDefault();
    
    const email =  formRef.current.querySelector('#email').value
    const phone = formRef.current.querySelector('#phone').value
    console.log('함수 실행', email, phone)
    findPassword({email, phone})
  };
  return (
    <>
      <form ref={formRef}>
        <div>
          <label
          >
            이메일 :
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일"
          />
        </div>
        <div>
          <label
          >
            전화번호 :
          </label>
          <input
            id="phone"
            name="phone"
            placeholder="전화번호"
            inputMode="numeric"
            required
          />
        </div>
        <button onClick={sendFindPassData}>재발급 받기</button>
      </form>
    </>
  )
}

export default FindPassWordPage