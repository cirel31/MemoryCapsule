import Modal from "react-modal";
import {useState} from "react";
import "../../styles/MyPage.scss"

const AnnounceUserViewPage = () => {
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const announceList = [
    { id: 1, title: "공지 1", content: "싸탈 마렵다..." },
    { id: 2, title: "공지 2", content: "집에 가고 싶다" +
          "dkkdkdkdk" +
          "dkdkdkkddk" +
          "dkdkdkkdkd" +
          "아아아아ㅏㅇ"  },
    { id: 3, title: "공지 3", content: "저녁 뭐먹지"  },
    { id: 4, title: "공지 4", content: "갸아아아아아아악"  },
  ];
  const announceView = announceList.slice(
    (announceList.length - 3),
    (announceList.length),
  );

  const openModal = (id) => {
    const index = announceList.findIndex((post => post.id === id))
    setSelectedPost(announceList[index])
    setIsModal(true)
  }
  const closeModal = () => {
    setSelectedPost(null)
    setIsModal(false)
  }

  Modal.setAppElement("#root");

  return (
    <div style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', justifyItems: 'center'}}>
      <div>
        <div>
          {announceView.map((post) => (
            <div
              className="mypage_notice_part"
              key={post.id}
              onClick={() => openModal(post.id)}
            >
              <p>{post.title}</p>
              {/*// 내용 : {post.content}*/}
            </div>
          ))}
      </div>
    </div>

      <Modal isOpen={isModal} onRequestClose={closeModal} className="notice_modal_part">
        {selectedPost && (
            <div className="modal_contents_box">
              <h2 className="modal_inner_title">
                {selectedPost.title}
                <hr/>
              </h2>
              <p className="modal_inner_contents">
                {selectedPost.content}
              </p>
              <button onClick={closeModal}>닫기</button>
            </div>
        )}
      </Modal>

  </div>
  )
}
export default AnnounceUserViewPage;