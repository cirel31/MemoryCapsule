import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import '../styles/Calendar.css'
import moment from "moment";
import axios from "axios";
import {useSelector} from "react-redux";
// import {useNavigate} from "react-router-dom";

const CalendarPage = () => {
  // const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.userState.isLoggedIn)
  console.log(isLoggedIn)

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
  ])

  useEffect(() => {
    // 출석 날짜 정보를 서버에서 가져와서 state에 저장
    const fetchAttendanceDates = async () => {
      try {
        // 서버 api 주소는 변경 예정
        const response = await axios.get('/localhost:8000/api/getAttendanceDates');
        // data 받는 변수 이름도 변경 예정
        setAttendanceDates(response.data.attendanceDates);
      } catch (error) {
        console.error('서버와 통신 에러 - 출석 데이터 받지 못함:', error);
      }
    };
    fetchAttendanceDates();
  }, []);

  const [value, onChange] = useState(new Date())
  const username = '김싸피'
  const countMemory = 0
  const countProject = 0
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Calendar
          onChange={onChange}
          value={value}
          tileClassName={({ date, view }) => {
            if (attendanceDates.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              console.log(date)
              return "highlight2"
            }
          }}
        />
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <h3>{username}  </h3>
            <p>  님은 지금까지</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <h3>{countMemory}  </h3>
            <p>  개의 추억을 기록하고 </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <h3>{countProject}  </h3>
            <p> 개의 캡슐을 제작하셨어요!</p>
          </div>
        </div>
      </div>
      {/*<style>*/}
      {/*  {`*/}
      {/*  .highlight2 {*/}
      {/*    background-image: url(${backImg});*/}
      {/*    background-size: 10px 10px; */}
      {/*  }*/}
      {/*  `}*/}
      {/*</style>*/}
  </div>
  )
}

export default CalendarPage