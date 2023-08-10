import {  useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {findPassThunk, loginUserThunk} from "../store/userSlice";

const useLoginEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isValidEmail, setIsValidEmail] = useState(true);

  const loginUser = async (loginData) => {
    try {
      await dispatch(loginUserThunk(loginData));
      console.log('로그인 데이터 : ', loginData)
    } catch (err) {
      console.error("로그인 에러 발생", err);
    }
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  
  return { isValidEmail, setIsValidEmail, loginUser, validateEmail };
};

export default useLoginEmail;
