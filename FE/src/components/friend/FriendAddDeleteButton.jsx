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
            <div>
                {
                    (1 === 1)
                        ?<CustomButtonFriend className="CustomButtonFriend addFriend" value={select.id} onClick={addFriend}> + </CustomButtonFriend>
                        :<CustomButtonFriend className="CustomButtonFriend discardFriend" value={select.id} onClick={discardFriend}> - </CustomButtonFriend>
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
