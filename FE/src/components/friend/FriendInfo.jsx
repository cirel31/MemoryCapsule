import { FriendItem } from "../../styles/friendStyle";

const FriendInfo = ({select, setSelect, id, name, username, email, address, phone, website}) => {
    const selectFriend = () => {
        const selected = {
            "id" : email,
        };
        setSelect(selected);
        console.log("[selectFriend] ", select);
    }

    return (
        <FriendItem>
            <div className="FriendItem">
                <div className="info">
                    <span className="author_info">
                        e-mail : {email}<br/>
                        name : {name}<br/>
                        nickname : {username}<br/>
                    </span>
                    <div onClick={selectFriend}> 자세히보기 </div>
                </div>
            </div>
        </FriendItem>
    )
}

export default FriendInfo;
