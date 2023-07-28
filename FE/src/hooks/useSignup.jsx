import { useState } from "react";
import axios from "axios";

const useSignup = () => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // 비밀번호 일치 여부 확인 함수
  const passwordChecking = (password, passwordCheck) => {
    return password === passwordCheck;
  };

  // 체크박스 값 변경 이벤트 핸들러 함수
  const handleCheckBoxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // 회원가입 데이터 서버로 전송 함수
  const sendSignupDataServer = async (signupData) => {
    console.log('회원가입 정보 서버 제출 함수 작동 확인')
    console.log('세션 스토리지 확인', sessionStorage)
    try {
      // 회원가입 요청 보내기
      const signupResponse = await axios.post("http://localhost:7000/signup", signupData);
      console.log(signupResponse.data);

      // 회원가입 성공 시,  로그인 요청 보내기
      const loginData = {
        id: signupData.id,
        password: signupData.password,
      };
      const loginResponse = await axios.post("http://localhost:7000/login", loginData);
      console.log(loginResponse.data);

      const jwtTokenFromServer = loginResponse.data.jwtToken;
      sessionStorage.setItem("jwtToken", jwtTokenFromServer);
      console.log(sessionStorage)

      // 이후 로그인 페이지로 이동
      // navigate("/main");
    } catch (error) {
      console.error("회원가입 에러 발생", error);
      // 회원가입 실패 시 대응
    }
  };

  return {
    isValidEmail,
    setIsValidEmail,
    validateEmail,
    isChecked,
    setIsChecked,
    handleCheckBoxChange,
    passwordChecking,
    sendSignupDataServer,
  };
};

export default useSignup;
