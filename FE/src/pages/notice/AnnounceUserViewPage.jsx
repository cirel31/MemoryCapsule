import React from "react";
import "../../styles/AnnounceStyle.scss"
import go_back from "../../assets/images/frield/go_back.svg";
import AnnounceList from "../../components/announce/AnnounceList";
import {Link} from "react-router-dom";

const AnnounceUserViewPage = () => {
  return (
      <>
          <div className="announce_top"/>
          <div className="announce_body">
              <div className="announce_top_content">
                  <div className="announce_title">공지사항</div>
                  <div className="announce_back">
                      <Link to="/mypage">
                          <div className="announce_back_button">
                              <img src={go_back} alt="뒤로가기이미지" className="announce_back_button_img"/>
                          </div>
                      </Link>
                  </div>
              </div>
              <AnnounceList page={0} size={10}/>
          </div>
      </>
  )
}
export default AnnounceUserViewPage;