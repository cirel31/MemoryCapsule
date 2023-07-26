import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'

const CalendarPage = () => {
  const [value, onChange] = useState(new Date())
  const username = '김싸피'
  const countMemory = 0
  const countProject = 0
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <Calendar onChange={onChange} value={value} />
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
    </div>
  )
}

export default CalendarPage