import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import stamp_best from "../../assets/images/stamp/stamp_best.svg"
import stamp_angry from "../../assets/images/stamp/stamp_angry.svg"
import stamp_hansum from "../../assets/images/stamp/stamp_hansum.svg"
import stamp_sad from "../../assets/images/stamp/stamp_sad.svg"
import stamp_sick from "../../assets/images/stamp/stamp_sick.svg"
import stamp_soso from "../../assets/images/stamp/stamp_soso.svg"
import stamp_wow from "../../assets/images/stamp/stamp_wow.svg"
import Modal from "react-modal";
import axios from "axios"

const ArticleCreateForm = () => {
  const formRef = useRef(null)
  const [photos, setPhotos] = useState([])
  const [text, setText] = useState("");
  const articleId = window.location.href.replace(window.location.origin, "")
  const [stampModalOpen, setStampModalOpen] = useState(false)
  const [feelingStamp, setFellingStamp] = useState([])
  const baseURL = "http://i9a608.p.ssafy.io:8000"
  const subURL = articleId
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
  useEffect(() => {
    console.log(articleId)
  })

  const handleImage = (e) => {
    const imageLists = [...e.target.files];
    const newImageUrlLists = [...photos];

    if (newImageUrlLists.length + imageLists.length > 4) {
      alert("이미지는 최대 4개까지만 업로드할 수 있습니다.");
      return;
    }

    imageLists.forEach((key) => {
      if (!newImageUrlLists.some((photo) => photo === URL.createObjectURL(key))) {
        newImageUrlLists.push(URL.createObjectURL(key));
      }
    });
    setPhotos(newImageUrlLists);
    console.log(photos)
  };

  const deletePhoto = (idx) => {
    URL.revokeObjectURL(photos[idx])
    const newPhotos = photos.filter((photo, index) => index !== idx)
    setPhotos(newPhotos)
    console.log(photos)
  }

  const handleTextChange = (e) => {
    if (e.target.value.length > 150) {
      setText(e.target.value.slice(0, 150));
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
    console.log("제출버튼 누름")
    const formData = new FormData(e.target)
    console.log(formData)
    for (let [name, value] of formData.entries()) {
      console.log(`${name}: ${value}`);
    }
    axios.post(`${baseURL}${subURL}`, formData, {
      headers : {
        "Content-Type": "application/json",
        "userId": 1001,
      }
    })
      .then(res => {
        console.log("게시글 등록 성공", res)
      })
      .catch(err => {
        console.log("게시글 등록 실패", err)
      })

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
                  name="article_img"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImage}
                />
              </label>
              <div>
                {photos.map((photo, index) => (
                  <div key={index}>
                    <img
                      src={photo}
                      alt={`미리보기 이미지 ${index+1}`}
                      style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                    />
                    <button type="button" onClick={() => deletePhoto(index)}>삭제</button>
                  </div>
                ))}
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
                {/* 서버에 도장 정보 보낼 인풋 */}
                <input
                  name="article_stamp"
                  style={{display:"none"}}
                  type="number"
                  value={feelingStamp[0]}
                />
              </div>
              <textarea
                name="article_content"
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