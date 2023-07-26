import {useState} from "react";
import Calendar from "react-calendar";
import '../styles/Calendar.css'
import moment from "moment";
// import backImg from '../assets/images/kokona.png'

const CalendarPage = () => {
  // const backImg = backImg
  const [attendanceDates, setAttendanceDates] = useState([
    "2023-07-04",
    "2023-07-12",
    "2023-07-15",
    "2023-07-21",
  ])
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