import {useLocation} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";
import {fetchUserInfoThunk} from "../../store/userSlice";
import {useDispatch} from "react-redux";

const KakaoLoginPage = () => {
  const { search } = useLocation();
  const dispatch = useDispatch()
  const params = new URLSearchParams(search);
  // const state = params.get("state");
  const code = params.get("code");
  const baseURL = 'https://i9a608.p.ssafy.io:8000';
  const subURL = '/login/kakao';
  
  useEffect(() => {
    if(code) {
      axios.get(`${baseURL}${subURL}?code=${code}`)
        .then((response) => {
          console.log("서버로부터 받음", response);
          sessionStorage.setItem("userIdx", response.data.userIdx)
          sessionStorage.setItem("accessToken", response.data.accessToken)
          sessionStorage.setItem("refreshToken", response.data.refreshToken)
          console.log(sessionStorage)
          const userIdx = sessionStorage.getItem("userIdx");
          dispatch(fetchUserInfoThunk(userIdx))
          window.location.href ='/main'
        })
        .catch((error) => {
          console.log("서버로부터 받지 못함", error);
        });
    }
  }, [code]);

  return (
    <>
      <div>
        Now Loading...
      </div>
    </>
  );
}

export default KakaoLoginPage;
