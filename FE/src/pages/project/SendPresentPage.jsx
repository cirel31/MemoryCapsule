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
import present_bg0 from "../../assets/images/present/present_bg0.svg"
import present_bg1 from "../../assets/images/present/present_bg1.svg"
import present_bg2 from "../../assets/images/present/present_bg2.svg"
import present_bg3 from "../../assets/images/present/present_bg3.svg"
import present_bg4 from "../../assets/images/present/present_bg4.svg"
import present_bg5 from "../../assets/images/present/present_bg5.svg"
import present_bg6 from "../../assets/images/present/present_bg6.svg"

const SendPresentPage = () => {
  
  const randomFunc = () => {
    return Math.floor(Math.random() * 5);
  }
  
  const decos = [present_bg1,present_bg3,present_bg0];
  
  function getRandomImage() {
    const randomIndex1 = Math.floor(Math.random() * decos.length);
    return decos[randomIndex1];
  }
  const decos_2 = [present_bg4,present_bg0,present_bg5,present_bg6];
  
  function getRandomDeco() {
    const randomIndex2 = Math.floor(Math.random() * decos_2.length);
    return decos_2[randomIndex2];
  }
  
  
  
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
        <img src={present_bg2} className="deco_bg"/>
        {datas.map((article, index) => (
          <div key={index} className="present_contents">
            
            {/*<img src={present_bg0} className="present_bg"/>*/}
            
            <div className={`present_content_${randomFunc()}`}>
              
              <img
                src={article.images[0]}
                alt="이미지 없음"
                className="contents_img"
                onError={(e) => {e.target.src = kokona}}
              />
              <img src={getRandomDeco()} className={`deco${randomFunc()}`}/>
              <div className="content_group">
                <div>
                  <img
                    src={article.userVo.imgUrl}
                    alt="이미지없음"
                    className="article_profile"
                  />
                  <p>{article.userVo.nickname}</p>
                </div>
                <img
                  src={stamps[article.stamp-1].stamp}
                  alt="이미지 없음"
                  className="stamps"
                />
                <p>{article.content}</p>
                <img src={getRandomImage()} className="deco_1"/>
              </div>
              
            </div>
            
            {article.images[1] && (
              <div>
                {article.images.slice(1).map((image, index) => (
                  <div className={`photo_${randomFunc()}`}>
                    <img
                      key={index+1}
                      src={image}
                      alt="이미지 없음"
                      onError={(e) => {e.target.src = kokona}}
                    />
                  </div>
                  
                ))}
              </div>
            ) }
            
           
            
            
            
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