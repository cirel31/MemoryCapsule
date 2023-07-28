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
      // 서버로 로그인 데이터 보내고 jwt 토큰을 받기
      const response = await axios.post("http://localhost:7000/login", loginData);
      const jwtToken = response.data.jwtToken;
      // 확인을 위해 세션스토리지에 토큰 저장 후 세션 스토리지 콘솔 출력
      sessionStorage.setItem("jwtToken", jwtToken)
      console.log(sessionStorage)
      // 로그인 성공 시 jwt 토큰을 login 액션에 전달하여 상태를 업데이트
      dispatch(login(jwtToken));
    } catch (error) {
      console.error("서버와 통신 실패로 로그인 에러 발생", error);
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
