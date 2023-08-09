import { useNavigate } from "react-router-dom";
import {useRef, useState} from "react";
import Calendar from "react-calendar";
import '../../styles/Calendar.scss'
import Modal from "react-modal";
import axios from "axios";
import ProjectAddFriends from "../../components/project/ProjectAddFriends";
import {useDispatch, useSelector} from "react-redux";
import {removeAll} from "../../store/selectFriendSlice";
import moment from "moment";
import photo_picto from "../../assets/images/signup/upload.svg";
import solo_w from "../../assets/images/projectcreate/solo_white.svg";
import create_w from "../../assets/images/projectcreate/write.svg";
import group_w from "../../assets/images/projectcreate/Group_white.svg";
import group_r from "../../assets/images/projectcreate/Group_red.svg";
import def_img from "../../assets/images/stamp/stamp_best.svg"

const ProjectForm = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()
  const [photos, setPhotos] = useState([])
  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [showEndDateModal, setShowEndDateModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [multiplayModal, setMultiplayModal] = useState(false);
  const dispatch = useDispatch()
  const selectedUsers = useSelector((state) => state.friend.selectedPeople)
  const user = useSelector((state) => state.userState.user) || null
  const SubmitURL = "https://i9a608.p.ssafy.io:8000/project/create"
  const handleSubmit = (e) => {
    e.preventDefault()
    const users = selectedUsers.map(user => Number(user)) || null
    console.log(users)
    const formData = new FormData(formRef.current)
    formData.append('started', moment(startDate).format("YYYY-MM-DD[T]00:00:00"))
    formData.append('ended', moment(endDate).format("YYYY-MM-DD[T]00:00:00"))
    if (users.length > 0) {
      formData.append('userList', JSON.stringify(users))
    }
    formData.append('type', 1)
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    // const accessToken = sessionStorage.getItem("accessToken")
    try {
      axios.post(`${SubmitURL}`, formData, {
        headers: {
          // Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
          "userId": user.userId,
        },
      })
        .then((res) => {
          console.log(res, "프로젝트 생성 성공")
          navigate('/project')
        })
        .catch((err) => {
          console.log(err, "프로젝트 생성 실패")
          console.log(err.config)
        })
    } catch (error) {
      console.log(error, "오류 발생");
    }
  }
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(new Date(date.getTime() + 86400000))
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  
  const handleImage = (e) => {
    // 현재 선택된 파일의 목록을 가져옵니다.
    const imageLists = Array.from(e.target.files);
    
    // 이미 선택된 이미지 URL 목록을 가져옵니다.
    const newImageUrlLists = [...photos];
    
    imageLists.forEach((file) => {
      const objectURL = URL.createObjectURL(file);
      if (!newImageUrlLists.includes(objectURL)) {
        newImageUrlLists.push(objectURL);
      }
    });
    
    setPhotos(newImageUrlLists);
    console.log(photos);
  };
  
  const deletePhoto = (idx) => {
    const newPhotos = photos.filter((photo, index) => index !== idx);
    setPhotos(newPhotos);
    console.log(photos);
  };
  
  return (
    <div className="project_create_forms_body">
      <div>
        <form ref={formRef}>
          <div className="img_createupload">
            <div>
              {photos.map((photo, index) => (
                <div key={index}>
                  <img
                    src={photo}
                    alt={`미리보기 이미지 ${index+1}`}

                  />
                  <button type="button" onClick={() => deletePhoto(index)}>삭제</button>
                </div>
              ))}
            </div>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="image"
              onChange={handleImage}
            />
            <label htmlFor="image"><img src={photo_picto}/><p>캡슐 대표 이미지</p></label>


          </div>
          <div className="project_contents_createupload">
            <h1>새로운 캡슐 만들기</h1>

            <h2>캡슐 이름</h2>
            <input
              id="title"
              name="title"
              className="title"
              // required
            />

            <h2>제작 기간</h2>
            <div className="project_contents">

              <div className="dates">
                {/* 시작일 */}
                <input
                  className="dateselect"
                  // name="started"
                  type="text"
                  onClick={() => setShowStartDateModal(true)}
                  value={startDate ? startDate.toLocaleDateString() : ""}
                  // required
                  readOnly
                />
                <Modal isOpen={showStartDateModal} onRequestClose={() => setShowStartDateModal(false)}>
                  <Calendar
                    value={startDate}
                    onChange={handleStartDateChange}
                    onClickDay={() => setShowStartDateModal(false)}
                    dateFormat="yyyy-MM-dd"
                  />
                </Modal>

                <p>>>></p>

                {/* 종료일 */}
                <input
                  className="dateselect"
                  // name="ended"
                  type="text"
                  onClick={() => setShowEndDateModal(true)}
                  value={endDate ? endDate.toLocaleDateString() : ""}
                  // required
                  readOnly
                />
                <Modal isOpen={showEndDateModal} onRequestClose={() => setShowEndDateModal(false)}>
                  <Calendar
                    value={endDate}
                    onChange={handleEndDateChange}
                    onClickDay={() => setShowEndDateModal(false)}
                    minDate={startDate ? new Date(startDate.getTime() + 86400000) : undefined}
                    dateFormat="yyyy-MM-dd"
                  />
                </Modal>

              </div>
              <h2>캡슐설명</h2>

              <textarea
                name="content"
                id="example"
                className='example'
                spellCheck="false"
                // required
              />
            </div>
            <div>

            </div>
          </div>

          <br/>



          <br/>


          <br/>

          <br/>
          {/* 일부러 none 걸어논 거 */}
          <div style={{display:'none'}}>
            <input
              // name="userList"
              className="selectedUsers"
              value={selectedUsers}
            />
          </div>
        </form>
        <div>
          {/* 버튼이 눌린상태로 유지되어야 함. */}
          <div className="project_create_solo_button">
            <button onClick={() => dispatch(removeAll())}>
              <img src={solo_w}/>
              <p>혼자 할게요!</p>
            </button>
          </div>
          <div className="project_create_group_button">
            <button onClick={() => setMultiplayModal(true)}>
              <img src={group_w}/>
              <p>여러명이서 할게요!</p>
            </button>
            <Modal isOpen={multiplayModal} onRequestClose={() => setMultiplayModal(false)}>
              <ProjectAddFriends />
            </Modal>
          </div>
        </div>
      </div>

      <div className="friends_with">
        <p className="friends_with_titles">함께 하는 친구들</p>
        <div className="friends_with_profile_imgs">
          {selectedUsers.map((userId) => (
            <img
              key={userId}
              src={def_img}
            />
          ))}
        </div>
      </div>
      <button style={{marginTop:'1rem '}} onClick={handleSubmit}>생성하기 <img src={create_w}/></button>

    </div>
  )
}

export default ProjectForm