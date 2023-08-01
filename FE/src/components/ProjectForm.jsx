import { useNavigate } from "react-router-dom";
import {useRef, useState} from "react";
import Calendar from "react-calendar";
import '../styles/Calendar.css'
import Modal from "react-modal";
import axios from "axios";
import ProjectAddFriends from "../pages/ProjectAddFriends";
import {useDispatch, useSelector} from "react-redux";
import {removeAll} from "../store/selectFriendSlice";

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    width: "80%",
    maxWidth: "400px",
  },
};

const ProjectForm = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()
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

    const project = {
      'title': formRef.current.querySelector('.title').value,
      'content': formRef.current.querySelector('.example').value,
      'started': `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`,
      'ended': `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`,
    }
    const user = selectedUsers.map((id) => parseInt(id))
    const formData = {
      'project': project,
      'userList': user,
    }

    console.log(formData)
    // const accessToken = sessionStorage.getItem("accessToken")
    // console.log(accessToken)
    const jsonData = JSON.stringify(formData);
    console.log(SubmitURL)
    try {
      axios.post(`${SubmitURL}`, jsonData, {
        headers: {
          // Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "userId": "1001",
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

  return (
    <div>
      <div style={{display:"flex", justifyContent: "space-evenly", alignItems: "center"}}>
        <form ref={formRef} style={{marginTop:'2rem'}}>
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
            <Modal isOpen={multiplayModal} onRequestClose={() => setMultiplayModal(false)} style={customModalStyles}>
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