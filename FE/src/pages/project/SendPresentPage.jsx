import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import kokona from "../../assets/images/kokona.png"
import "../../styles/ProjectPresent.scss"
import stamp_angry from "../../assets/images/stamp/stamp_angry.svg";
import stamp_best from "../../assets/images/stamp/stamp_best.svg";
import stamp_hansum from "../../assets/images/stamp/stamp_hansum.svg";
import stamp_sad from "../../assets/images/stamp/stamp_sad.svg";
import stamp_sick from "../../assets/images/stamp/stamp_sick.svg";
import stamp_soso from "../../assets/images/stamp/stamp_soso.svg";
import stamp_wow from "../../assets/images/stamp/stamp_wow.svg";

const SendPresentPage = () => {
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
  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const subURL = '/project/gift'

  const { Kakao } = window;

  const giftUrl = useParams()

  const [datas, setDatas] = useState([])


  useEffect(() => {
    axios.get(`${baseURL}${subURL}/${giftUrl.giftUrl}`)
      .then((response) => {
        console.log(`${baseURL}${subURL}/${giftUrl.giftUrl}`)
        console.log(response)
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
      requestUrl: `https://memorycapsule.site/project/present/${giftUrl.giftUrl}`,
      templateId: 97142,
    })
  }, []);
  
  return (
    <>
      <div className="present_body">
        {datas.map((article, index) => (
          <div key={index} className={`present_contents_${index}`}>
            <div>
              <img
                src={article.userVo.imgUrl}
                alt="이미지없음"
              />
              <p>{article.userVo.nickname}</p>

              
              <p>{article.content}</p>
              <img
                src={stamps[article.stamp-1].stamp}
                alt="이미지 없음"
              />
              <img
                src={article.images[0]}
                alt="이미지 없음"
                onError={(e) => {e.target.src = kokona}}
              />
              
            </div>
            
            <div>
              {article.images.slice(1).map((image, index) => (
                <img
                  key={index+1}
                  src={image}
                  alt="이미지 없음"
                  onError={(e) => {e.target.src = kokona}}
                />
              ))}
            </div>
            
            
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