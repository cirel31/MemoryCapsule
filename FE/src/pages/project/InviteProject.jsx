import axios from "axios";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useSelector} from "react-redux";

const InviteProject = () => {
  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const inviteURL = '/project/invite'

  const [inviteLists, setInviteLists] = useState([])

  const user = useSelector((state) => state.userState.user) || null

  useEffect(() => {
    const searchInvite = async () => {
      // const accessToken = sessionStorage.getItem("accessToken")
      try {
        await axios.get(`${baseURL}${inviteURL}`, {
          headers: {
            // Authorization: `Bearer ${accessToken}`
            "userId": user.userId
          }
        })
          .then((response) => {
            setInviteLists(response.data)
          })
          .catch(() => {
          })
      } catch (error) {
      }
    }
    searchInvite()
  }, [])
 
  const acceptInvite = ({userId, inviteId}) => {
    const formData = new FormData()
    formData.append("inviteId", inviteId)
    try {
       axios.post(`${baseURL}${inviteURL}/accept`, formData, {
        headers: {
          "userId": `${userId}`,
        }
      })
        .then(() => {
          window.location.reload()
        })
        .catch(() => {
        })
    } catch (error) {
    }
  }
  
  const dismissInvite = ({userId, inviteId}) => {
    const formData = new FormData()
    formData.append("inviteId", inviteId)
    try {
      axios.post(`${baseURL}${inviteURL}/reject`, formData, {
        headers: {
          "userId": `${userId}`,
        }
      })
        .then((res) => {
          window.location.reload()
        })
        .catch(() => {
        })
    } catch (error) {
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
      confirmButtonText: '수락하기',
      cancelButtonText: '거절하기',
    })
      .then((result) => {
      if (result.isConfirmed) {
        const userId = content.userId
        const inviteId = content.id
        acceptInvite({userId, inviteId})
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
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
           <div key={idx + 1}>
             <h2>초 대 장</h2>
             <button onClick={() => showAlert(content)}>초대 확인하기</button>
           </div>
         ))}
       </div>
     </>
  )
}

export default InviteProject