import axios from "axios";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";

const InviteProject = () => {
  const [inviteLists, setInviteLists] = useState([])
  useEffect(() => {
    const searchInvite = async () => {
      const accessToken = sessionStorage.getItem("accessToken")
      try {
        await axios.get('/project/invite', {
          headers: {
            // Authorization: `Bearer ${accessToken}`
            "userId": "9"
          }
        })
          .then((res) => {
            console.log(res.data)
            setInviteLists(res.data)
          })
          .catch((err) => {
            console.log(err.response)
          })
      } catch (error) {
        console.error('로그아웃 중 에러 발생:', error)
      }
    }
    searchInvite()
  }, [])
 
  const acceptInvite = ({userId, inviteId}) => {
    const formData = new FormData()
    formData.append("inviteId", inviteId)
    try {
       axios.post('/project/invite/accept', formData, {
        headers: {
          "userId": `${userId}`,
        }
      })
        .then((res) => {
          console.log(res.data)
          window.location.reload()
        })
        .catch((err) => {
          console.log(userId, inviteId)
          console.log('제출 형식이 잘못되었을지도...', err.response)
        })
    } catch (error) {
      console.error('초대 승인 에러 발생:', error)
    }
  }
  
  const dismissInvite = ({userId, inviteId}) => {
    const formData = new FormData()
    formData.append("inviteId", inviteId)
    try {
      axios.post('/project/invite/reject', formData, {
        headers: {
          "userId": `${userId}`,
        }
      })
        .then((res) => {
          console.log(res.data)
          window.location.reload()
        })
        .catch((err) => {
          console.log(userId, inviteId)
          console.log('제출 형식이 잘못되었을지도...', err.response)
        })
    } catch (error) {
      console.error('초대 거절 에러 발생:', error)
    }
  }
  const showAlert = (content) => {
    Swal.fire({
      title: '초 대 장',
      html: `
      <p>${content.inviter} 님이</p>
      <p>${content.userId} 에게</p>
      <p>${content.projectId}에</p>
      <p>초대했어요!</p>
    `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    })
      .then((result) => {
      if (result.isConfirmed) {
        console.log('확인 버튼 클릭!');
        const userId = content.userId
        const inviteId = content.id
        acceptInvite({userId, inviteId})
      } else if (result.isDismissed) {
        console.log('취소 버튼 클릭!');
        const userId = content.userId
        const inviteId = content.id
        dismissInvite({userId, inviteId})
      }
    })
  }
  
  return (
     <>
      <div>
        <h1>초대받은 프로젝트</h1>
      </div>
       <div>
         {inviteLists.map((content, idx) => (
           <div>
             <div key={idx + 1}>
               <h2>초 대 장</h2>
               <button onClick={() => showAlert(content)}>초대 확인하기</button>
               
             </div>
           </div>
         ))}
       </div>
     </>
  )
}

export default InviteProject