import "../../styles/MainStyle.scss"
import santa_logo from "../../assets/images/footer/santa_logo.svg"

const Footer = () => {
  // const handleBack = () => {
  //   window.history.back()
  // }
  // const handleFront = () => {
  //   window.history.forward()
  // }
  return (
    <>
      <div className="footer">
        <div className="footer_contents_box">
          <img src={santa_logo}/>
          <div className="footer_contents_textbox">
            <div className="footer_contents_txt">
              <p>SANTA</p>
              <p>서비스 소개</p>
              <p>이용약관</p>
              <p>개인정보처리방침</p>
              <p>SANTA 운영정책</p>
              <p>고객센터</p>

            </div>
            <div className="footer_contents_copyright">
              <p>ⓒ2023. SANTA All rights reserved.</p>
            </div>
          </div>
        </div>
        {/*<h3>Footer 영역</h3>*/}
        {/*<div style={{ display: 'flex', justifyContent: 'space-between' }}>*/}
        {/*  <button onClick={handleBack}>뒤로</button>*/}
        {/*  <button onClick={handleFront}>앞으로</button>*/}
        {/*</div>*/}

      </div>
    </>
  )
}

export default Footer;
