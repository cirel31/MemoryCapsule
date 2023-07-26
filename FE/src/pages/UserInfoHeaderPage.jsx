import sample_img from "../assets/images/kokona.png"

const UserInfoHeaderPage = () => {
  const userNickname = '김싸피'
  const userEmail = 'jdragon@ssafy.com'
  const friendsCount = 0
  return (
    <div>
      <div style={{ height: '200px', display: 'grid', gridTemplateColumns:'100px 1fr 1fr 1fr 1fr 1fr', gap: '5px', alignItems: 'center'}}>

        <div>

        </div>
        <img style={{width: '100px'}} src={sample_img} alt="이미지샘플"/>
        <div>
          <h3>{userNickname}</h3>
          <h3>{userEmail}</h3>
        </div>
        <div>
          <h3>등록된 친구 {friendsCount}</h3>
        </div>
        <div>
          <h3>프로필 수정</h3>
        </div>
        <div>
          <h3>회사 로고</h3>
        </div>
      </div>
    </div>
  )
}
export default UserInfoHeaderPage;
