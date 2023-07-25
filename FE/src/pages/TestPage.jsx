import { Link } from "react-router-dom";
import { useState } from "react";

const TestPage = () => {
  const postList = [
    { id: 1, title: "게시글 1" },
    { id: 2, title: "게시글 2" },
    { id: 3, title: "게시글 3" },
    { id: 4, title: "게시글 4" },
    { id: 5, title: "게시글 5" },
    { id: 6, title: "게시글 6" },
    { id: 7, title: "게시글 7" },
    { id: 8, title: "게시글 8" },
    { id: 9, title: "게시글 9" },
    { id: 10, title: "게시글 10" },
    { id: 11, title: "게시글 11" },
    { id: 12, title: "게시글 12" },
    { id: 13, title: "게시글 13" },
    { id: 14, title: "게시글 14" },
    { id: 15, title: "게시글 15" },
    { id: 16, title: "게시글 16" },
  ];

  const [currentSection, setCurrentSection] = useState(0);
  // const postsPerPage = 3;
  const currentPosts = postList.slice(
      currentSection,
      (currentSection + 3),
  );

  const leftBTN = (e) => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };
  const rightBTN = (e) => {
    setCurrentSection((prev) => Math.min(prev + 1, Math.ceil(postList.length ) - 1));
  };

  return (
      <div>
        <hr />
        <button onClick={leftBTN}>◀</button>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {currentPosts.map((post) => (
              <div style={{marginRight: '1rem',
                fontSize:
                    ((currentSection === 0) && (currentSection + 1 === post.id)) || (currentSection === postList.length - 1) ? '36px' :
                        (currentSection > 0 && (currentSection + 2)) === post.id ? '36px' : '18px',

              }} key={post.id}>
                <Link to={`/test/${post.id}`}>
                  제목 : {post.title}
                </Link>
                {/*currentSection : {currentSection}, id : {post.id}, 제목 : {post.title}  */}

              </div>
          ))}
        </div>
        <button onClick={rightBTN}>▶</button>
        <hr />
      </div>
  );
}

export default TestPage