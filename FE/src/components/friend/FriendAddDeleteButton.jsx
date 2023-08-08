import {AuthFormBlock, CustomButtonFriend, FormBody, WhiteBox} from "../../styles/friendStyle";
import React, {useState} from "react";
import Modal from "react-modal";

const FriendAddDeleteButton = ({select}) => {
    const [friendModalIsOpen, setFriendModalIsOpen] = useState(0);

    const addFriend = (e) => {
        const {value} = e.target;
        console.log("[addFriend] : ", value);

        //친구 추가 요청 처리
        if (true) {
            // 성공
            setFriendModalIsOpen(1);
            console.log("SUCCESS", select);
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
            console.log("SUCCESS", select);
        } else {
            // 실패
            console.log("FAIL");
        }
    }
    return (
        <>
            <div className="friend_add_delete_button">
                {
                    (1 === 1)
                        ?<button className="add_discard_button add_friend" value={select.id} onClick={addFriend}> 친구추가 </button>
                        :<button className="add_discard_button discard_friend" value={select.id} onClick={discardFriend}> 친구삭제 </button>
                }
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
        </>
    );
};

export default FriendAddDeleteButton;
