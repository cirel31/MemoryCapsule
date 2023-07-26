const FriendInfo = ({id, name, username, email, address, phone, website}) => {
    console.log(id, name, username);

    const addFriend = (e) => {
        const {value} = e.target;
        console.log(value);
    }
    const discardFriend = (e) => {
        const {value} = e.target;
        console.log(value);
    }

    return (
        <div className="FriendItem">
            <div className="info">
                <span className="author_info">
                  | email : {email} | name : {name} | username : {username}
                  {
                    (1===1)
                    ? <button className="addFriend" value={email} onClick={addFriend}> 친구 추가 </button>
                    : <button className="discardFriend" value={email} onClick={discardFriend}> 친구 삭제 </button>
                  }
                </span>
            </div>
        </div>
    )
}

export default FriendInfo;
