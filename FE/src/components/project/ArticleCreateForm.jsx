import {useEffect, useRef, useState} from "react";
import stamp_best from "../../assets/images/stamp/stamp_best.svg"
import stamp_angry from "../../assets/images/stamp/stamp_angry.svg"
import stamp_hansum from "../../assets/images/stamp/stamp_hansum.svg"
import stamp_sad from "../../assets/images/stamp/stamp_sad.svg"
import stamp_sick from "../../assets/images/stamp/stamp_sick.svg"
import stamp_soso from "../../assets/images/stamp/stamp_soso.svg"
import stamp_wow from "../../assets/images/stamp/stamp_wow.svg"
import Modal from "react-modal";
import axios from "axios"
import {useSelector} from "react-redux";
import Swal from "sweetalert2";

const ArticleCreateForm = () => {
  const formRef = useRef(null)
  const [photos, setPhotos] = useState([])
  const [text, setText] = useState("");
  const articleId = window.location.href.replace(window.location.origin, "")
  const [stampModalOpen, setStampModalOpen] = useState(false)
  const [feelingStamp, setFellingStamp] = useState([])
  const baseURL = "https://i9a608.p.ssafy.io:8000"
  const subURL = articleId
  const pointURL = "/user/point"
  const user = useSelector((state) => state.userState.user) || null
  const point = user.point || 0
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const stamps = [
    {
      "id": 1,
      "stamp": stamp_angry,
    },
    {
      "id": 2,
      "stamp": stamp_best,
    },
    {
      "id": 3,
      "stamp": stamp_hansum,
    },
    {
      "id": 4,
      "stamp": stamp_sad,
    },
    {
      "id": 5,
      "stamp": stamp_sick,
    },
    {
      "id": 6,
      "stamp": stamp_soso,
    },
    {
      "id": 7,
      "stamp": stamp_wow,
    },
  ]
  const openStampModal = (e) => {
    e.preventDefault()
    setStampModalOpen(true)
  }
  const closeStampModal = () => {
    setStampModalOpen(false)
  }

  const handleImage = (e) => {
    const imageLists = [...e.target.files];
    const newImageUrlLists = [...photos];

    if (newImageUrlLists.length + imageLists.length > 4) {
      Swal.fire({
        title: '경고',
        text: '이미지 파일은 4개를 넘을 수 없습니다.',
        icon: 'error',
      });
      return;
    }

    imageLists.forEach((key) => {
      if (!newImageUrlLists.some((photo) => photo === URL.createObjectURL(key))) {
        newImageUrlLists.push(URL.createObjectURL(key));
      }
    });
    setPhotos(newImageUrlLists);
  };

  const deletePhoto = (idx) => {
    URL.revokeObjectURL(photos[idx])
    const newPhotos = photos.filter((photo, index) => index !== idx)
    setPhotos(newPhotos)
    const imageInput = document.getElementById('image');
    if (imageInput) imageInput.value = '';
    setCurrentImageIndex(0)
  }

  const handleTextChange = (e) => {
    if (e.target.value.length > 150) {
      setText(e.target.value.slice(0, 150));
      Swal.fire({
        title: '경고',
        text: '게시글 내용은 150자를 넘을 수 없습니다.',
        icon: 'error',
      });
    } else {
      setText(e.target.value);
    }
  }
  const appendStamp = (stamp) => {
    setFellingStamp([stamp.id, stamp.stamp])
    setStampModalOpen(false)
  }
  const createArticle = (e) => {
    e.preventDefault();
    const needPoint = (photos.length - 1) * 50
    console.log("제출버튼 누름")
    if (needPoint < point) {
      const formData = new FormData(e.target)
      // photos.forEach((photo, index) => {
      //   formData.append(`files`, photo)
      // });
      //
      // formData.append('content', text)
      // if (feelingStamp[0]) {
      //   formData.append('stamp', feelingStamp[0])
      // }
      for (let [name, value] of formData.entries()) {
        console.log(`${name}: ${value}`);
      }
      axios.post(`${baseURL}${subURL}`, formData, {
        headers : {
          "userId": user.userId,
        }
      })
          .then(response => {
            // axios.put(`${baseURL}${pointURL}${user.userId}?point=${point-needPoint}`)
            window.location.href ='/project'
          })
          .catch(error => {
            console.log(baseURL,subURL, user.userId)
            console.log("게시글 등록 실패", error)
            if (error.response.status === 401 && error.response.data === 'false') {
              Swal.fire("오늘의 추억은 이미 등록되었습니다.")
            }
          })
    }


  }

  Modal.setAppElement("#root");

  return (
    <>
      <div>
        <h3>게시물 생성 페이지</h3>
        <form ref={formRef} onSubmit={createArticle} >
          <div style={{display: "flex" }}>
            <div>
              <p>현재 업로드 된 사진 수 : {photos.length} </p>
              <label>
                이미지 업로드:
                <br/>
                <input
                  name="files"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImage}
                />
              </label>
              {/*<div>*/}
              {/*  {photos.map((photo, index) => (*/}
              {/*    <div key={index}>*/}
              {/*      <img*/}
              {/*        src={photo}*/}
              {/*        alt={`미리보기 이미지 ${index+1}`}*/}
              {/*        style={{ width: '300px', height: '300px', objectFit: 'cover' }}*/}
              {/*      />*/}
              {/*      <button type="button" onClick={() => deletePhoto(index)}>삭제</button>*/}
              {/*    </div>*/}
              {/*  ))}*/}
              {/*</div>*/}
              <div>
                {photos.length > 0 && (
                    <div>
                      <img
                          src={photos[currentImageIndex]}
                          alt={`미리보기 이미지 ${currentImageIndex + 1}`}
                          style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                      />
                      <button type="button" onClick={() => deletePhoto(currentImageIndex)}>삭제</button>
                      <button type="button" disabled={currentImageIndex === 0} onClick={() => setCurrentImageIndex(prev => prev - 1)}>이전</button>
                      <button type="button" disabled={currentImageIndex === photos.length - 1} onClick={() => setCurrentImageIndex(prev => prev + 1)}>다음</button>
                    </div>
                )}
              </div>
            </div>
            <div>
              <div>
                {feelingStamp && (
                  <div>
                    <img src={feelingStamp[1]} alt="" style={{width:"50px"}}/>
                  </div>
                )}
                <button type="button" onClick={openStampModal}>
                  백점만점
                </button>
                <h4>오늘의 기분 도장 찍기</h4>
                <Modal isOpen={stampModalOpen}>
                  {stamps.map((stamp) => (
                    <div key={stamp.id} onClick={() => appendStamp(stamp)}>
                      <img src={stamp.stamp} alt={stamp.id} style={{width:"50px"}} />
                    </div>
                  ))}
                  <button type="button" onClick={closeStampModal}>
                    닫기
                  </button>
                </Modal>
                <input
                  name="stamp"
                  style={{display:"none"}}
                  type="number"
                  value={feelingStamp[0]}
                />
              </div>
              <textarea
                name="content"
                value={text}
                onChange={handleTextChange}
                maxLength={150}
                style={{ width:'300px', height:'200px' }}
              />
              <div>글자 수 : {text.length} / 150</div>
            </div>
          </div>
          <button type="submit">게시물 등록</button>
        </form>
      </div>
    </>
  )
}

export default ArticleCreateForm;