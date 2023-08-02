import { FriendItem, CustomButtonFriend } from "../../styles/friendStyle";

const FriendInfo = ({id, name, username, email, address, phone, website}) => {
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
                        e-mail : {email}<br/>
                        name : {name}<br/>
                        nickname : {username}<br/>
                    </span>
                    <div>
                        {
                            (1 === 1)
                            ?<CustomButtonFriend className="CustomButtonFriend addFriend" value={email} onClick={addFriend}> + </CustomButtonFriend>
                            :<CustomButtonFriend className="CustomButtonFriend discardFriend" value={email} onClick={discardFriend}> - </CustomButtonFriend>
                        }
                    </div>
                </div>
            </div>
        </FriendItem>
    )
}

export default FriendInfo;
