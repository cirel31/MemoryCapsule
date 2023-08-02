import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const PostCreateForm = (pageLabel) => {

  const [photos, setPhotos] = useState([])
  const [text, setText] = useState("");
  const userPoint = useSelector((state) => state.userState.point);

  useEffect(() => {
    console.log(userPoint);
  });

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
    console.log("[handleTextChange]");
    if (e.target.value.length > 5000) {
      setText(e.target.value.slice(0, 5000));
    } else {
      setText(e.target.value);
    }
  }

  const createArticle = () => {
    console.log("[createArticle]");
    console.log("Not yet");

    if (pageLabel === "notice") {
      console.log("Create notice Post");
    } else if (pageLabel === "review") {
      console.log("Create review Post");
    } else {
      console.log("잘못된 요청입니다.");
    }
  }

  return (
    <>
      <div>
        <h3>{pageLabel === "notice" ? "공지사항" : "리뷰"} 생성 페이지</h3>
        <form onSubmit={createArticle} >
          <div style={{display: "flex" }}>
            <div>
              <p>현재 업로드 된 사진 수 : {photos.length} </p>

              <label>
                이미지 업로드:
                <br/>
                <input type="file" accept="image/*" multiple onChange={handleImage} />
              </label>
              <div>
                {photos.map((photo, index) => (
                  <div key={index}>
                    <img
                      src={photo}
                      alt={`미리보기 이미지 ${index+1}`}
                      style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                    />
                    <button onClick={() => deletePhoto(index)}>삭제</button>
                  </div>

                ))}
              </div>
            </div>
            <div>
              <textarea
                value={text}
                onChange={handleTextChange}
                maxLength={5000}
              />
              <div>글자 수 : {text.length} / 5000</div>
            </div>
          </div>
          <button type="submit">공지사항 등록</button>
        </form>
      </div>
    </>
  )
}

export default PostCreateForm;