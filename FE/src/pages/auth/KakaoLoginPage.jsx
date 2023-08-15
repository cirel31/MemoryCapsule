import {useLocation} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {fetchUserInfoThunk} from "../../store/userSlice";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import LoadingPage from "../LoadingPage";

const KakaoLoginPage = () => {
  const { search } = useLocation();
  const dispatch = useDispatch()
  const params = new URLSearchParams(search);
  const [isLoading, setIsLoading] = useState(true);
  const code = params.get("code");
  const baseURL = 'https://i9a608.p.ssafy.io:8000';
  const subURL = '/login/kakao';
  
  useEffect(() => {
    if(code) {
      axios.get(`${baseURL}${subURL}?code=${code}`)
        .then((response) => {
          setIsLoading(false)
          sessionStorage.setItem("userIdx", response.data.userIdx)
          sessionStorage.setItem("accessToken", response.data.accessToken)
          sessionStorage.setItem("refreshToken", response.data.refreshToken)
          const userIdx = sessionStorage.getItem("userIdx");
          dispatch(fetchUserInfoThunk(userIdx))
          window.location.href ='/main'
        })
        .catch((error) => {
          setIsLoading(false)
          if (error.response.status === 500 && error.response.data === "자체 회원가입으로 등록된 유저입니다.") {
            Swal.fire({
              text: error.response.data,
              focusConfirm: false,
              confirmButtonText: '확인',
            })
                .then((result) => {
                  if (result.isConfirmed) {
                    window.location.href ='/login'
                  }
                })
          }
        });
    }
  }, [code]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div>
        Now Loading...
      </div>
    </>
  );
}

export default KakaoLoginPage;
