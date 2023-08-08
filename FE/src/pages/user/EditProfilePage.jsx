import {useDispatch, useSelector} from "react-redux";
import defaultImg from "../../assets/images/stamp/stamp_best.svg";
import {useRef, useState} from "react";
import axios from "axios";
import {fetchUserInfoThunk} from "../../store/userSlice";

const EditProfilePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userState.user) || null
  console.log(user)
  const user_nickname = user?.nickname || 'james'
  const user_img = user?.imgUrl || defaultImg
  const [imgFile, setImgFile] = useState(user_img);
  const [originNickname, setoriginNickname] = useState(user_nickname);
  const imgRef = useRef();
  const nickRef = useRef()
  const formRef = useRef()
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    setImgFile(URL.createObjectURL(file));
  };
  const saveNickname = () => {
    const nickname = nickRef.current.value
    setoriginNickname(nickname)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const baseURL = 'https://i9a608.p.ssafy.io:8000'
    const subURL = '/user/change'
    const accessToken = sessionStorage.getItem("accessToken")
    const userId = user.userId
    const formData = new FormData(formRef.current)
    try {
      axios.put(`${baseURL}${subURL}`, formData, {
        headers: {
          "userId": {userId},
          "Authorization": `Bearer ${accessToken}`,
        }
      })
        .then((response) => {
          console.log("프로필 데이터 갱신 성공", response)
          dispatch(fetchUserInfoThunk(userId))
        })
        .catch((error) => {
          console.log("프로필 데이터 갱신 실패", error)
        })
    }
    catch (err) {
      console.log("정보수정 서버에 전달도 안됐다고....", err)
    }
    
  };
  
  return (
    <>
      <div>
        <div>
          <h3>프로필 수정</h3>
        </div>
        <form ref={formRef}>
          <div>
            <img
              src={imgFile}
              alt="프로필 이미지를 불러올 수 없습니다."
              style={{width:"200px"}}
            />
            <input
              name="imgUrl"
              type="file"
              accept="image/*"
              onChange={saveImgFile}
              ref={imgRef}
            />
          </div>
          <div>
            <input
              name="nickname"
              type="text"
              value={originNickname}
              onChange={saveNickname}
              ref={nickRef}
            />
          </div>
          <button onClick={handleSubmit}>프로필 변경하기</button>
        </form>
        
      </div>
      <button>비밀번호 변경하기</button>
    </>
  )
}

export default EditProfilePage