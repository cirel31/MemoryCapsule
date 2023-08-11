import { useEffect } from 'react';

const { Kakao } = window;

const KakaoSharePage = () =>  {
  const subURL = 'https://i9a608.p.ssafy.io/project/';
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init('1af0163235ced24b3f4bc66a23b24509');
    }
    Kakao.Share.createScrapButton({
      container: '#kakao-share',
      requestUrl: subURL,
    })
  }, []);
  // useEffect(() => {
  //   if (!Kakao.isInitialized()) {
  //     Kakao.init('1af0163235ced24b3f4bc66a23b24509');
  //   }
  //
  //   Kakao.Share.createDefaultButton({
  //     container: '#kakao-share-btn',
  //     objectType: 'feed',
  //     content: {
  //       title: '선물이 도착했어요!',
  //       description: 'present',
  //       imageUrl: 'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/logo.jpg',
  //       link: {
  //         webUrl: subURL,
  //       },
  //     },
  //     itemContent: {
  //       profileText: 'Memory Capsule',
  //       titleImageUrl: 'https://ssafysanta.s3.ap-northeast-2.amazonaws.com/logo.png',
  //       titleImageText: 'Ideal',
  //       titleImageCategory: 'impossible dream',
  //     },
  //     buttons: [
  //       {
  //         title: '웹으로 이동',
  //         link: {
  //           webUrl: subURL,
  //         },
  //       },
  //     ],
  //   });
  //
  //   return () => {
  //     Kakao.cleanup();
  //   }
  // }, []);
  
  return (
    <>
      {/*<button id="kakao-share-btn">*/}
      {/*  <img*/}
      {/*    src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"*/}
      {/*    alt="카카오링크 보내기 버튼"*/}
      {/*  />*/}
      {/*</button>*/}
      
      <button id="kakao-share">
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
          alt="카카오링크 보내기 버튼"
        />
      </button>
    </>
  )
}

export default KakaoSharePage;
