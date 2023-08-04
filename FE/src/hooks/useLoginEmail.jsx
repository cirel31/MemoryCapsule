import { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';

const useLoginEmail = () => {
  const dispatch = useDispatch();
  const [isValidEmail, setIsValidEmail] = useState(true);

  // 백 서버 통신을 통한 로그인 처리
  const loginUser = async (loginData) => {
    try {
      const response = await axios.post("http://localhost:7000/login", loginData);
      const { accessToken, redirectToken } = response.data;

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("redirectToken", redirectToken);
      console.log(sessionStorage);

      dispatch(login({ accessToken, redirectToken }))
    } catch (error) {
      console.error("서버와 통신 실패로 로그인 에러 발생", error);
      console.log(sessionStorage);
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
