import { FriendItem, CustomButtonFriend } from "../../styles/friendStyle";
import Modal from "react-modal";
import {useState} from "react";

const FriendInfo = ({select, setSelect, id, name, username, email, address, phone, website}) => {

    const [friendModalIsOpen, setFriendModalIsOpen] = useState(0);

    const addFriend = (e) => {
        const {value} = e.target;
        console.log("[addFriend] : ", value);

        //친구 추가 요청 처리
        if (true) {
            // 성공
            setFriendModalIsOpen(1);
        } else {
            console.log("FAIL");
        }

    }
    const discardFriend = (e) => {
        const {value} = e.target;
        console.log("[discardFriend] : ", value);

        //친구 삭제 요청 처리
        if (true) {
            // 성공
            setFriendModalIsOpen(2);    //친구 삭제
        } else {
            // 실패
            console.log("FAIL");
        }
    }

    const selectFriend = () => {
        const selected = {
            "id" : email,
        };
        setSelect(selected);
        console.log("[selectFriend] ", select);
    }

    return (
        <FriendItem>
            <div className="FriendItem" onClick={selectFriend}>
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
            {/* 모달 창 */}
            <Modal isOpen={friendModalIsOpen !== 0}>
                {
                    <div style={{width:'100%', height:'100%'}} onClick={() => setFriendModalIsOpen(0)}>
                    {
                        friendModalIsOpen === 1
                        ?"친구 추가 요청이 처리되었습니다."
                        :"친구 삭제 요청이 처리되었습니다."
                    }
                    </div>
                }
            </Modal>
        </FriendItem>
    )
}

export default FriendInfo;
