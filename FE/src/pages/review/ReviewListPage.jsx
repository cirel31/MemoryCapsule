import React from "react";
import "../../styles/ReviewStyle.scss"
import go_back from "../../assets/images/frield/go_back.svg";
import ReviewList from "../../components/review/ReviewList";
import {Link} from "react-router-dom";

const ReviewListPage = () => {
  return (
      <>
          <div className="review_top"/>
          <div className="review_body">
              <div className="review_top_content">
                  <div className="review_title">리뷰 페이지</div>
                  <div className="review_back">
                      <Link to="/mypage">
                          <div className="review_back_button">
                              <img src={go_back} alt="뒤로가기이미지" className="review_back_button_img"/>
                          </div>
                      </Link>
                  </div>
              </div>
              <ReviewList page={0} size={10}/>
          </div>
      </>
  )
}
export default ReviewListPage;