import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const SendPresentPage = () => {
  const giftUrl = useParams()
  const baseURL = 'https://i9a608.p.ssafy.io:8000'
  const subURL = '/project/gift'
  const [datas, setDatas] = useState([])
  useEffect(() => {
    axios.get(`${baseURL}${subURL}/${giftUrl.giftUrl}`)
      .then((response) => {
        console.log(response.data)
        setDatas(response.data.articleVos)
      })
      .catch((error) => {
        console.log(error)
        console.log(giftUrl)
      })
  }, [])
  
  return (
    <>
      <div>
        선물 제작 진행 중
      </div>
      <div>
        {datas.map((article) => (
          <div>
            <p>{article.content}</p>
            <img src={article.images[0]} />
          </div>
        ))}
      </div>
    </>
  )
}

export default SendPresentPage