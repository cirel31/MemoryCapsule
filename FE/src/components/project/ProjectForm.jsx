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

  const SubmitURL = "http://i9a608.p.ssafy.io:8000/project/create"
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('제출 버튼 누름')
    const formData = new FormData(formRef.current)

    // const project = {
    //   'title': formRef.current.querySelector('.title').value,
    //   'content': formRef.current.querySelector('.example').value,
    //   'started': moment(startDate).format("YYYY-MM-DD[T]00:00:00"),
    //   'ended': moment(endDate).format("YYYY-MM-DD[T]00:00:00"),
    // }
    // const user = selectedUsers.map((id) => parseInt(id))
    // const formData = {
    //   'project': project,
    //   'userList': user,
    // }

    console.log(formData)
    // const accessToken = sessionStorage.getItem("accessToken")
    // console.log(accessToken)
    console.log(SubmitURL)
    // try {
    //   axios.post(`${SubmitURL}`, formData, {
    //     headers: {
    //       // Authorization: `Bearer ${accessToken}`,
    //       "Content-Type": "application/json",
    //       "userId": 1004,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res, "프로젝트 생성 성공")
    //       navigate('/project')
    //     })
    //     .catch((err) => {
    //       console.log(err, "프로젝트 생성 실패")
    //       console.log(err.config)
    //     })
    // } catch (error) {
    //   console.log(error, "오류 발생");
    // }
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
    <div>
      <div>
        <form ref={formRef}>
          <div>
            <label id="title">캡슐 이름</label>
            <br/>
            <input
              id="title"
              className="title"
              // required
            />
          </div>
          <br/>
          <div>
            <label id="image">프로젝트 이미지</label>
            <br/>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="image"
              onChange={handleImage}
            />
            <div>
              {photos.map((photo, index) => (
                <div key={index}>
                  <img
                    src={photo}
                    alt={`미리보기 이미지 ${index+1}`}
                    style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                  />
                  <button type="button" onClick={() => deletePhoto(index)}>삭제</button>
                </div>
              ))}
            </div>
          </div>
          <br/>
          <div>
            <label>제작 기간</label>
            <br />
            <div>
              {/* 시작일 */}
              <input
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

              >>>>>

              {/* 종료일 */}
              <input
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

          </div>
          <br/>
          <div>
            <label id="example">캡슐설명</label>
            <br/>
            <textarea id="example" className='example'
                      // required
            />
          </div>
          <br/>
          {/* 일부러 none 걸어논 거 */}
          <div style={{display:'none'}}>
            <input
              className="selectedUsers"
              value={selectedUsers}
            />
          </div>
        </form>
        <div>
          {/* 지금은 버튼으로 만들어둠 나충에 이미지로 바꾸십시오 */}
          <div>
            <button onClick={() => dispatch(removeAll())}>
              혼자 할거야!
            </button>
          </div>
          <div>
            <button onClick={() => setMultiplayModal(true)}>
              여러명이서 할거야!
            </button>
            <Modal isOpen={multiplayModal} onRequestClose={() => setMultiplayModal(false)}>
              <ProjectAddFriends />
            </Modal>
          </div>
        </div>
      </div>

      <div>
        <h3>참여자 애들 프로필 사진 띄울 거</h3>
        <div>
          {selectedUsers.map((userId) => (
            <p key={userId}>{userId}</p>
          ))}
        </div>
      </div>
      <div>
        <button style={{marginTop:'1rem '}} onClick={handleSubmit}>생성하기</button>
      </div>
    </div>
  )
}

export default ProjectForm