import {useDispatch, useSelector} from "react-redux";
import defaultImg from "../../assets/images/stamp/stamp_best.svg";
import {useRef, useState} from "react";
import axios from "axios";
import profileedit_bg from "../../assets/images/signup/Sign_up.svg"
import "../../styles/EditProfile.scss"
import photo_picto from "../../assets/images/signup/upload.svg"
import {fetchUserInfoThunk} from "../../store/userSlice";
<<<<<<< HEAD
=======

>>>>>>> 58ccac9394c625ecd351fcef1219fdc06bed5203

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
      <div className="profile_edit_body">
        <img src={profileedit_bg} className="profile_edit_back"/>
        <form ref={formRef} className="profile_edit_forms_body">

          <div className="img_editupload">
            <img
              src={imgFile}
              alt="프로필 이미지를 불러올 수 없습니다."
            />
            <input
              name="imgUrl"
              type="file"
              accept="image/*"
              onChange={saveImgFile}
              ref={imgRef}
              id="edit_image"
            />
            <label htmlFor="edit_image">
              <img src={photo_picto}/><p>사진 변경하기</p>
            </label>
          </div>
          <div className="nickname_edit">
            <div>
              <h2>닉네임 변경하기</h2>
              <input
                name="nickname"
                type="text"
                value={originNickname}
                onChange={saveNickname}
                ref={nickRef}
              />
            </div>
            <button onClick={handleSubmit}>프로필 변경하기</button>
            <button>비밀번호 변경하기</button>
          </div>
        </form>
        
      </div>

    </>
  )
}

export default EditProfilePage