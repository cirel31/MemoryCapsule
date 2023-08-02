import { useNavigate } from "react-router-dom";
import {useRef, useState} from "react";
import Calendar from "react-calendar";
import '../styles/Calendar.css'
import Modal from "react-modal";
import axios from "axios";
import ProjectAddFriends from "../pages/ProjectAddFriends";


const ProjectForm = () => {
  const [selectedUsers, setSelectedUsers] = useState([])
  const formRef = useRef(null)
  const navigate = useNavigate()
  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [showEndDateModal, setShowEndDateModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [multiplayModal, setMultiplayModal] = useState(false);

  const SubmitURL = ""
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('제출 버튼 누름')
    const formData = new FormData(formRef.current)
    console.log(formData, formRef.current)
    const accessToken = sessionStorage.getItem("accessToken")
    axios.post(SubmitURL, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        console.log(res, "프로젝트 생성 성공")
        navigate('/project')
      })
      .catch((err) => {
        console.log(err, "프로젝트 생성 실패")
      })
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
              required
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
                required
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
                required
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
            <textarea id="example" required />
          </div>
          <br/>
        </form>
        <div>
          {/* 지금은 버튼으로 만들어둠 나충에 이미지로 바꾸십시오 */}
          <div>
            <button>
              혼자 할거야!
            </button>
          </div>
          <div>
            <button onClick={() => setMultiplayModal(true)}>
              여러명이서 할거야!
            </button>
            <Modal isOpen={multiplayModal} onRequestClose={() => setMultiplayModal(false)}>
              <ProjectAddFriends selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
            </Modal>
          </div>
        </div>
      </div>

      <div>
        참여자 애들 얼굴 띄울 거
        <h1>12e1e</h1>
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