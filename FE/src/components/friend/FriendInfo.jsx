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
                        email : {email}<br/>
                        name : {name}<br/>
                        username : {username}<br/>
                    </span>
                    <div>
                        {
                            (1===1)
                            ?<CustomButtonFriend className="CustomButtonFriend addFriend" value={email} onClick={addFriend}> 추가 </CustomButtonFriend>
                            :<CustomButtonFriend className="CustomButtonFriend discardFriend" value={email} onClick={discardFriend}> 삭제 </CustomButtonFriend>
                        }
                    </div>
                </div>
            </div>
        </FriendItem>
    )
}

export default FriendInfo;
