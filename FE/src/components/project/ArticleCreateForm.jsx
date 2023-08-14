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

import article_bg from "../../assets/images/projectcreate/Projectcreate.svg"
import "../../styles/ArticleCreate.scss"

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
    if (needPoint <= point) {
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
    else {
      Swal.fire({
        title: '경고',
        text: '포인트가 부족합니다. 이미지 수를 줄여주세요.',
        icon: 'error',
      });
    }


  }

  Modal.setAppElement("#root");

  return (
    <>
      <div className="article_create_body">
        <img src={article_bg} className="article_create_back"/>
        <div className="article_create_forms_body">
          <h3>게시물 생성 페이지</h3>
          <form ref={formRef} onSubmit={createArticle} >
            <div >
              <div className="img_article_createupload">
                {/* 시간되면 지금 몇번째 사진인지 확인할 수 있어야 함.*/}


                <div>
                  {photos.length > 0 && (
                    <div>
                      <div className="number_cnt">
                        <p>{photos.length}/4</p>
                      </div>
                      <img
                        src={photos[currentImageIndex]}
                        alt={`미리보기 이미지 ${currentImageIndex + 1}`}
                      />
                      <div className="photoUI_btn">
                        <button type="button" disabled={currentImageIndex === 0} onClick={() => setCurrentImageIndex(prev => prev - 1)}>이전</button>
                        <button type="button" disabled={currentImageIndex === photos.length - 1} onClick={() => setCurrentImageIndex(prev => prev + 1)}>다음</button>
                        <button type="button" onClick={() => deletePhoto(currentImageIndex)} className="delete_btn">삭제</button>
                      </div>
                    </div>
                  )}
                </div>
                <label>
                  사진 추가하기
                  <br/>
                  <input
                    name="files"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImage}
                  />
                </label>

              </div>
              <div className="article_contents_createupload">
                <div>
                  <h4>오늘의 기분 도장 찍기</h4>
                  <div className="stamp_groups">
                    {feelingStamp && (
                      <div className="stamp_preview">
                        <img src={feelingStamp[1]} alt=""/>
                      </div>
                    )}
                    <div>
                      <button type="button" onClick={openStampModal}>
                        도장찍기
                      </button>
                    </div>

                  </div>


                  <Modal isOpen={stampModalOpen} className="article_stamp_modal">
                    <h2>오늘의 기분스탬프를 골라주세요!</h2>
                    <div>
                      {stamps.map((stamp) => (
                        <div key={stamp.id} onClick={() => appendStamp(stamp)}>
                          <img src={stamp.stamp} alt={stamp.id}/>
                        </div>
                      ))}
                      <button type="button" onClick={closeStampModal}>
                        닫기
                      </button>
                    </div>


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
                  className="article_text"
                  value={text}
                  onChange={handleTextChange}
                  maxLength={100}
                />
                <div className="cnt_word">{text.length} / 100</div>
              </div>
            </div>
            <button type="submit" className="article_submit">게시물 등록</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ArticleCreateForm;