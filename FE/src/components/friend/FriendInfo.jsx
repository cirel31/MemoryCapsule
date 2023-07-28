import { FriendItem, CustomButtonFriend } from "../../styles/friendStyle";

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
        <FriendItem>
            <div className="FriendItem">
                <div className="info">
                    <span className="author_info">
                      | email : {email} | name : {name} | username : {username}
                      {
                        (1===1)
                        ?<CustomButtonFriend className="addFriend" value={email} onClick={addFriend}> 친구 추가 </CustomButtonFriend>
                        :<CustomButtonFriend className="discardFriend" value={email} onClick={discardFriend}> 친구 삭제 </CustomButtonFriend>
                      }
                    </span>
                </div>
            </div>
        </FriendItem>
    )
}

export default FriendInfo;
