const FriendInfo = ({id, name, username, email, address, phone, website}) => {
    console.log(id, name, username);
    return (
        <div className="FriendItem">
            <div className="info">
            <span className="author_info">
              | email : {email} | name : {name} | username : {username}
            </span>
            </div>
        </div>
    )
}

export default FriendInfo;
