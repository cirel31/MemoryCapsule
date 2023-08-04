import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {login, setUser} from '../store/userSlice';
import {useNavigate} from "react-router-dom";

const useLoginEmail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isValidEmail, setIsValidEmail] = useState(true);
  // 백 서버 통신을 통한 로그인 처리
  const loginURL = '/user/login'
  const infoURL = '/detail'
  const loginUser = async (loginData) => {
    try {
      await axios.post(`${loginURL}`, loginData, {
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then(res => {
          console.log(res.data)
          const userIdx= res.data.userIdx
          dispatch(login(res.data))
          userInfoUpdate(userIdx)
        })
        .catch(err => {
          console.error('로그인 에러!!!!:', err)
        })
    } catch (err) {
      console.error("서버와 통신 실패로 로그인 에러 발생", err);
    }
  };

  const userInfoUpdate = (userIdx) => {
    const accessToken = JSON.parse(sessionStorage.getItem("loginData")).accessToken
    console.log(accessToken)
    try {
      axios.get(`/user/${userIdx}${infoURL}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
        .then(res => {
          const userData = res.data
          dispatch(setUser(userData))
        })
        .then(() => {
          navigate('/mypage')
        })
        .catch(err => {
          console.error('유저 정보를 가져오지 못함:', err)
        })
    }
    catch (err) {
      console.error('유저 정보를 가져오지 못함:', err)
    }
  }

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  return { isValidEmail, setIsValidEmail, loginUser, validateEmail };
};

export default useLoginEmail;
