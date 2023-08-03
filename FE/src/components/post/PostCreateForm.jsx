import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const PostCreateForm = (pageDetail, pageLabel, staus) => {
  const [page, setPage] = useState(pageDetail);
  const currentPageLabel = pageLabel.pageLabel === "notice" ? "공지사항" : "리뷰";
  const currentStaus = (staus==="create"?"생성":"수정");
  const isCreateNew = (currentStaus === "생성");
  const [photos, setPhotos] = useState([])
  const [text, setText] = useState("");
  const userPoint = useSelector((state) => state.userState.point);

  const handleImage = (e) => {
    const imageLists = [...e.target.files];
    const newImageUrlLists = [...photos];

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
    const value = e.target.value;
    console.log("[handleTextChange] : ", value);
    if (value.length > 5000) {
      setText(value.slice(0, 5000));
    } else {
      setText(value);
    }
  }

  const createArticle = (e) => {
    e.preventDefault();
    console.log("[createArticle]");

    if (pageLabel.pageLabel === "notice") {
      console.log("Create notice Post");
    } else if (pageLabel.pageLabel === "review") {
      console.log("Create review Post");
    } else {
      console.log("잘못된 요청입니다.");
    }
  }

  return (
    <>
      <div>
        <h3>{currentPageLabel} {currentStaus} 페이지</h3>
        <form onSubmit={createArticle} >
          <div>
            <div>
              <input>
              {page.title}
              </input>
            </div>
            <div>
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
          <button type="submit">{currentPageLabel} {currentStaus}</button>
        </form>
      </div>
    </>
  )
}

export default PostCreateForm;