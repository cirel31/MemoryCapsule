import { useNavigate } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Calendar from "react-calendar";
import '../../styles/Calendar.scss'
import Modal from "react-modal";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addFriends, removeAll, removeFriends} from "../../store/selectFriendSlice";
import moment from "moment";
import photo_picto from "../../assets/images/signup/upload.svg";
import solo_w from "../../assets/images/projectcreate/solo_white.svg";
import create_w from "../../assets/images/projectcreate/write.svg";
import group_w from "../../assets/images/projectcreate/Group_white.svg";
import Swal from "sweetalert2";

const ProjectForm = () => {
  const baseURL = "https://i9a608.p.ssafy.io:8000"
  const subURL = '/project/create'
  const formRef = useRef(null)
  const navigate = useNavigate()
  const [photos, setPhotos] = useState([])
  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [showEndDateModal, setShowEndDateModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userState.user) || null

  const selectedUsers = useSelector((state) => state.friend.selectedPeople)
  const [coworker, setCoworker] = useState([])
  const [isActive, setIsActive] = useState(false)
  const today = new Date()
  const monthFromNow = moment().add(1, 'months').toDate()
  const oneYearFromNow = moment().add(1, 'years').toDate()
  
  useEffect(() => {
    setCoworker(selectedUsers.map((user) => (
      user.userId
    )))
  }, [selectedUsers])

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = selectedUsers.map(user => Number(user.userId)) || null
    const formData = new FormData(formRef.current)
    formData.append('started', moment(startDate).format("YYYY-MM-DD[T]00:00:00"))
    formData.append('ended', moment(endDate).format("YYYY-MM-DD[T]00:00:00"))
    if (users.length > 0) {
      formData.append('userList', JSON.stringify(users))
    }
    formData.append('type', 1)
    // const accessToken = sessionStorage.getItem("accessToken")
    try {
      axios.post(`${baseURL}${subURL}`, formData, {
        headers: {
          // Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
          "userId": user.userId,
        },
      })
        .then((res) => {
          window.location.href = '/project'
        })
        .catch(() => {

        })
    } catch (error) {
    }
  }
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(moment(date).add(1, 'days').toDate())
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  
  const handleImage = (e) => {
    const imageLists = Array.from(e.target.files);
    const newImageUrlLists = [...photos];
    
    imageLists.forEach((file) => {
      const objectURL = URL.createObjectURL(file);
      if (!newImageUrlLists.includes(objectURL)) {
        newImageUrlLists.push(objectURL);
      }
    });
    
    setPhotos(newImageUrlLists);
  };
  
  const deletePhoto = (idx) => {
    const newPhotos = photos.filter((photo, index) => index !== idx);
    setPhotos(newPhotos);
    const imageInput = document.getElementById('image');
    if (imageInput) imageInput.value = '';
  };

  const clickSolo = () => {
    setIsActive(false)
    dispatch(removeAll())
  }
  
  const clickFriends = () => {
    setIsActive(true)
    Swal.fire({
      title: "함께 할 친구",
      html: `
        ${selectedUsers?.map((user) => (
        `${user.nickname}\n`
        )).join('')}
        <input type="email" id="friendId" class="swal2-input" placeholder="친구 아이디">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: '추가',
      cancelButtonText: '취소',
      preConfirm: () => {
        let friendId = document.getElementById('friendId').value;
        return {
          friendId: friendId,
        };
      }
    })
      .then((result) => {
        if (result.isConfirmed) {
          const accessToken = sessionStorage.getItem("accessToken")
          axios.get(`https://i9a608.p.ssafy.io:8000/friend/find/${result.value.friendId}?host_id=${user.userId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
            .then((response) => {
              dispatch(addFriends(response.data))
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                text: "해당 유저가 존재하지 않습니다."
              })
            })
        }
      })
  }
  const removeFriendsList = (id) => {
    console.log(id)
    dispatch(removeFriends(id))
  }

  return (
    <div className="project_create_forms_body">
      <div>
        <form ref={formRef}>
          <div className="img_createupload">
            <div>
              {photos.map((photo, index) => (
                <div key={index}>
                  <img
                    src={photo}
                    alt={`미리보기 이미지 ${index+1}`}

                  />
                  <button type="button" onClick={() => deletePhoto(index)}>삭제</button>
                </div>
              ))}
            </div>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="image"
              onChange={handleImage}
            />
            <label htmlFor="image"><img src={photo_picto}/><p>캡슐 대표 이미지</p></label>


          </div>
          <div className="project_contents_createupload">
            <h1>새로운 캡슐 만들기</h1>

            <h2>캡슐 이름</h2>
            <input
              id="title"
              name="title"
              className="title"
              maxLength="10"
              // required
            />

            <h2>제작 기간</h2>
            <div className="project_contents">

              <div className="dates">
                {/* 시작일 */}
                <input
                  className="dateselect"
                  // name="started"
                  type="text"
                  onClick={() => setShowStartDateModal(true)}
                  value={startDate ? startDate.toLocaleDateString() : ""}
                  // required
                  readOnly
                />
                <Modal
                  isOpen={showStartDateModal}
                  onRequestClose={() => setShowStartDateModal(false)}
                  style={{
                    content: {
                      width: '450px',
                      height: '450px',
                      margin: 'auto',
                      top: '0',
                      left: '0',
                      right: '0',
                      bottom: '0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '30px',
                    },
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                  }}
                >
                  <Calendar
                    value={startDate}
                    onChange={handleStartDateChange}
                    onClickDay={() => setShowStartDateModal(false)}
                    minDate={today}
                    maxDate={monthFromNow}
                    dateFormat="yyyy-MM-dd"
                  />
                </Modal>

                <p>>>></p>

                {/* 종료일 */}
                <input
                  className="dateselect"
                  // name="ended"
                  type="text"
                  onClick={() => setShowEndDateModal(true)}
                  value={endDate ? endDate.toLocaleDateString() : ""}
                  // required
                  readOnly
                />
                <Modal
                  isOpen={showEndDateModal}
                  onRequestClose={() => setShowEndDateModal(false)}
                  style={{
                    content: {
                      width: '450px',
                      height: '450px',
                      margin: 'auto',
                      top: '0',
                      left: '0',
                      right: '0',
                      bottom: '0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '30px',
                    },
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                  }}
                >
                  <Calendar
                    value={endDate}
                    onChange={handleEndDateChange}
                    onClickDay={() => setShowEndDateModal(false)}
                    minDate={startDate ? new Date(startDate.getTime() + 86400000) : undefined}
                    maxDate={oneYearFromNow}
                    dateFormat="yyyy-MM-dd"
                  />
                </Modal>

              </div>
              <h2>캡슐설명</h2>

              <textarea
                name="content"
                id="example"
                className='example'
                spellCheck="false"
                // required
              />
            </div>
            <div>

            </div>
          </div>

          <br/>

          <br/>

          <br/>

          <br/>
          {/* 일부러 none 걸어논 거 */}
          <div style={{display:'none'}}>
            <input
              // name="userList"
              className="selectedUsers"
              value={coworker}
            />
          </div>
        </form>
        <div>
          {/* 버튼이 눌린상태로 유지되어야 함. */}
          <div className="project_create_solo_button">
            <button onClick={clickSolo} className={!isActive ? 'active' : ''}>
              <img src={solo_w}/>
              <p>혼자 할게요!</p>
            </button>
          </div>
          <div className="project_create_group_button">
            <button onClick={clickFriends} className={isActive ? 'active' : ''}>
              <img src={group_w}/>
              <p>여러명이서 할게요!</p>
            </button>
          </div>
        </div>
      </div>

      <div className="friends_with">
        <p className="friends_with_titles">함께 하는 친구들</p>
        <div className="friends_with_profile_imgs">
          {selectedUsers.map((user, index) => (
            <img
              key={index}
              src={user.imgUrl}
              onClick={() => removeFriendsList(user.userId)}
            />
          ))}
        </div>
      </div>
      <button style={{marginTop:'1rem '}} onClick={handleSubmit}>생성하기 <img src={create_w}/></button>

    </div>
  )
}

export default ProjectForm