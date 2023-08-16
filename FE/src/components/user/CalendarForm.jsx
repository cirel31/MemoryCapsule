import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import '../../styles/Calendar.scss'
import moment from "moment";
import axios from "axios";
import {useSelector} from "react-redux";
import goodstamp from "../../assets/images/stamp/stamp_best.svg"
// import {useNavigate} from "react-router-dom";

const CalendarForm = () => {
  const attend = useSelector((state) => state.userState.user?.accessList)
  const userId = useSelector((state) => state.userState.user?.userId)
  const [finishedProject, setFinishedProject] = useState('')
  const [countMemory, setCountMemory] = useState(0)

  const [attendanceDates, setAttendanceDates] = useState([
    "2023-06-28",
    "2023-07-04",
    "2023-07-12",
    "2023-07-15",
    "2023-07-21",
    "2023-07-25",
    "2023-08-01",
  ])

  useEffect(() => {
    const myAttendance = attend?.map(date => date.slice(0, 10)) || attendanceDates
    setAttendanceDates(myAttendance)
  },[]);
  
  useEffect(() => {
    const countCapsuleURL = 'https://i9a608.p.ssafy.io:8000/project/myinfo/info'
    
    try {
      axios.get(`${countCapsuleURL}`, {
        headers: {
          'userId': userId,
        }
      })
        .then((response) => {
          const finishedCapsules = response.data.doneNum || 0
          const counts = response.data.articleNum
          setFinishedProject(finishedCapsules)
          setCountMemory(counts)
        })
        .catch(() => {
          const finishedCapsules = 0
          setFinishedProject(finishedCapsules)
        })
    }
    catch (error) {
    }
  },[]);

  const [value, onChange] = useState(new Date())
  const user = useSelector((state) => state.userState.user)
  const username = user?.nickname || '김싸피'
  const memorys = countMemory
  const countProject = finishedProject
  return (
    <div>
      <div className="mypage_calenders">
        <Calendar
          locale="en-US"
          onChange={onChange}
          value={value}
          tileClassName={({ date, view }) => {
            if (attendanceDates.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              return "highlight2"
            }
          }}
        />
        <div className="mypage_shorts_info">
          <div className="mypage_txt_group1">
            <p className="mypage_shorts_highlight">{username}  </p>
            <p className="mypage_shorts_txt">  님은 지금까지</p>
          </div>
          <div className="mypage_txt_group2">
            <p className="mypage_shorts_highlight">{memorys}  </p>
            <p className="mypage_shorts_txt">  개의 추억을 기록하고 </p>
          </div>
          <div className="mypage_txt_group3">
            <p className="mypage_shorts_highlight">{countProject}  </p>
            <p className="mypage_shorts_txt"> 개의 캡슐을 제작하셨어요!</p>
          </div>
          <img src={goodstamp} className="good_stamp"/>
        </div>
      </div>
  </div>
  )
}

export default CalendarForm