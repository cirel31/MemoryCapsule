import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import '../../styles/Calendar.scss'
import moment from "moment";
import axios from "axios";
import {useSelector} from "react-redux";
import goodstamp from "../../assets/images/stamp/stamp_best.svg"
// import {useNavigate} from "react-router-dom";

const CalendarForm = () => {
  // const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn)
  const attend = useSelector((state) => state.userState.user?.accessList)
  const userId = useSelector((state) => state.userState.user?.userId)
  const [finishedProject, setFinishedProject] = useState('')
  const [countMemory, setCountMemory] = useState(0)
  console.log('로그인 상태 : ', isLoggedIn)
  console.log(attend)

  // 로그인 되지 않은 상태에서는 접근할 수 없는 페이지
  // 추후 로그인 기능 활성화 시 주석 해제할 것
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     console.log('로그인 상태')
  //   } else {
  //     console.log('로그아웃 상태')
  //     navigate('/login')
  //   }
  // }, [isLoggedIn, navigate])

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
    const countCapsuleURL = 'https://i9a608.p.ssafy.io:8000/project/myproject'
    let counts = 0
    try {
      axios.get(`${countCapsuleURL}`, {
        headers: {
          'userId': userId,
        }
      })
        .then((response) => {
          console.log('결과', response.data)
          const finishedCapsules = response.data.length || 0
          response.data.map(project => {
            counts += project.artielcNum
          })
          setFinishedProject(finishedCapsules)
          setCountMemory(counts)
        })
        .catch(() => {
          const finishedCapsules = 0
          setFinishedProject(finishedCapsules)
        })
    }
    catch (error) {
      console.log('에러에러 : ', error)
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
              console.log(date)
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