import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import kokona from "../../assets/images/kokona.png"

const SendPresentPage = () => {
  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const subURL = '/project/gift'

  const { Kakao } = window;

  const giftUrl = useParams()

  const [datas, setDatas] = useState([])


  useEffect(() => {
    axios.get(`${baseURL}${subURL}/${giftUrl.giftUrl}`)
      .then((response) => {
        setDatas(response.data.articleVos)
      })
      .catch(() => {
      })
  }, [])

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init('1af0163235ced24b3f4bc66a23b24509');
    }
    Kakao.Share.createScrapButton({
      container: '#kakao-share',
      requestUrl: `https://i9a608.p.ssafy.io/project/present/${giftUrl.giftUrl}`,
    })
  }, []);
  
  return (
    <>
      <div>
        선물 제작 진행 중
      </div>
      <div>
        {datas.map((article, index) => (
          <div key={index}>
            <p>{article.content}</p>
            
            <img
              src={article.images[0]}
              onError={(e) => {e.target.src = kokona}}
            />
            
            {article.images.slice(1).map((image, index) => (
              <img
                key={index+1}
                src={image}
                alt="이미지 없음"
                onError={(e) => {e.target.src = kokona}}
              />
            ))}
            
          </div>
        ))}
      </div>
      <div>
        <button id="kakao-share">
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
            alt="카카오링크 보내기 버튼"
          />
        </button>
      </div>
    </>
  )
}

export default SendPresentPage