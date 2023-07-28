import Modal from "react-modal";
import {useState} from "react";

const AnnounceUserViewPage = () => {
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const announceList = [
    { id: 1, title: "공지 1", content: "싸탈 마렵다..." },
    { id: 2, title: "공지 2", content: "집에 가고 싶다"  },
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
    <div style={{ textAlign: 'center', alignItems: 'center'}}>
      <div>
        <h2>공 지 사 항</h2>
      </div>
      <div>
        <div>
          {announceView.map((post) => (
            <div
              style={{ height: '50px' }}
              key={post.id}
              onClick={() => openModal(post.id)}
            >
              제목 : {post.title}
              내용 : {post.content}
            </div>
          ))}
      </div>
    </div>
      <Modal isOpen={isModal} onRequestClose={closeModal}>
        {selectedPost && (
          <div>
            <h2>
              {selectedPost.title}
            </h2>
            <h3>
              {selectedPost.content}
            </h3>
            <button onClick={closeModal}>닫기</button>
          </div>
        )}
      </Modal>
  </div>
  )
}
export default AnnounceUserViewPage;