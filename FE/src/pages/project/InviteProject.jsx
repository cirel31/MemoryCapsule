import axios from "axios";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useSelector} from "react-redux";

import letter from "../../assets/images/box/ticket.svg"
import cilling from "../../assets/images/box/ciling.svg"

const InviteProject = () => {
  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const inviteURL = '/project/invite'
  
  const [inviteLists, setInviteLists] = useState([])
  
  const user = useSelector((state) => state.userState.user) || null
  const accessToken = sessionStorage.getItem("accessToken")
  
  useEffect(() => {
    const searchInvite = async () => {
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
  }, [accessToken])
  
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
      <p>${user.nickname} 님에게</p>
      <p>${content.projectTitle}에</p>
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
       <div className="invite_body">
         <div>
           {inviteLists.length === 0 && (
             <p>아직 초대가 없어요....</p>
           )
           }
           {inviteLists.map((content, idx) => (
             <div key={idx+1} onClick={() => showAlert(content)} className="letters">
             </div>
           ))}
         </div>

       </div>
     </>
  )
}

export default InviteProject