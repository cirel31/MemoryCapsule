import {useDispatch, useSelector} from "react-redux";
import defaultImg from "../../assets/images/stamp/stamp_best.svg";
import {useRef, useState} from "react";
import axios from "axios";
import profileedit_bg from "../../assets/images/signup/Sign_up.svg"
import "../../styles/EditProfile.scss"
import photo_picto from "../../assets/images/signup/upload.svg"
import {fetchUserInfoThunk} from "../../store/userSlice";
import goback_btn from "../../assets/images/signup/go_back.svg";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";


const EditProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const subURL = '/user/change'

  const accessToken = sessionStorage.getItem("accessToken")
  const user = useSelector((state) => state.userState.user) || null
  const user_nickname = user?.nickname || 'james'
  const user_img = user?.imgUrl || defaultImg

  const [imgFile, setImgFile] = useState(user_img);
  const [originNickname, setOriginNickname] = useState(user_nickname);

  const imgRef = useRef();
  const nickRef = useRef()
  const formRef = useRef()

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    setImgFile(URL.createObjectURL(file));
  };
  const saveNickname = () => {
    const nickname = nickRef.current.value
    setOriginNickname(nickname)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user.userId
    let changeData = null
    if (user_img === imgFile) {
      const formData = new FormData()
      formData.append('nickName', originNickname)
      changeData = formData
    }
    else {
      const formData = new FormData(formRef.current)
      changeData = formData
    }
    changeData.append('userId', userId)
    try {
      axios.put(`${baseURL}${subURL}`, changeData, {
        headers: {
          // "userId": {userId},
          "Authorization": `Bearer ${accessToken}`,
        }
      })
        .then((response) => {
          console.log("프로필 데이터 갱신 성공", response)
          dispatch(fetchUserInfoThunk(userId))
          window.location.href ='/mypage'
        })
        .catch((error) => {
          console.log("프로필 데이터 갱신 실패", error)
        })
    }
    catch (err) {
      console.log("정보수정 서버에 전달도 안됐다고....", err)
    }

  };
  const handleMyPage = () => {
    navigate('/mypage')
  }
  const handelPassWord = (e) => {
    e.preventDefault()
    Swal.fire({
      title: '비밀번호 변경',
      icon: 'info',
      html: `
    <input type="password" id="currentPassword" class="swal2-input" placeholder="현재 비밀번호">
    <input type="password" id="newPassword" class="swal2-input" placeholder="새 비밀번호">
  `,
      focusConfirm: false,
      preConfirm: () => {
        let currentPassword = document.getElementById('currentPassword').value;
        let newPassword = document.getElementById('newPassword').value;
        return {
          currentPassword: currentPassword,
          newPassword: newPassword
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const currentPassword = result.value.currentPassword
        const newPassword = result.value.newPassword
        if (currentPassword &&  newPassword) {
          const passwordData = new FormData()
          passwordData.append('password', currentPassword)
          passwordData.append('newPassword', newPassword)
          passwordData.append('userId', user.userId)
          axios.put(`${baseURL}${subURL}_password`, passwordData, {
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            }
          })
            .then(() => {
              Swal.fire({
                text: "비밀번호가 변경되었습니다.",
                focusConfirm: false,
                confirmButtonText: '확인',
              })
                .then((result) => {
                  if (result.isConfirmed) {
                    window.location.href ='/profile'
                  }
                })
            })
            .catch((error) => {
              if (error.response.status === 304) {
                Swal.fire({
                  icon: 'warning',
                  text: "현재 비밀번호가 일치하지 않습니다.",
                  focusConfirm: false,
                  confirmButtonText: '확인',
                })
              }
            })
        }
      }
    })
      .catch((error) => {
        console.log('서버에 제출하기 전에 에러 발생', error)
      });
  }
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
              name="file"
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
                name="nickName"
                type="text"
                value={originNickname}
                onChange={saveNickname}
                ref={nickRef}
              />
            </div>
            <button onClick={handleSubmit}>프로필 변경하기</button>
            <button onClick={handelPassWord}>비밀번호 변경하기</button>
          </div>
        </form>
        <button onClick={handleMyPage} className="go_back"><img src={goback_btn}/></button>
      </div>
    </>
  )
}

export default EditProfilePage