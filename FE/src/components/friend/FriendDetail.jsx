import {AuthFormBlock, CustomButtonFriend, FormBody, WhiteBox} from "../../styles/friendStyle";
import React, {useState} from "react";
import Modal from "react-modal";

const FriendDetail = ({select, setSelect}) => {

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

    const closeFriendDetail = () => {
        setSelect({id : ""});
    }

    return (
        <>
            <FormBody>
                <WhiteBox>
                    <AuthFormBlock>
                        <div onClick={closeFriendDetail}>
                            ✖
                        </div>
                        <div>
                            <h1>user Detail</h1>
                        </div>
                        <div>User img</div>
                        <div>{select.id}</div>
                        <div>
                            <div>친구가 현재까지 작성한 기록</div>
                            <div>{} 개</div>
                        </div>
                        <div>
                            <div>친구가 현재 제작중인 캡슐</div>
                            <div>{} 개</div>
                        </div>
                        <div>
                            {
                                (1 === 1)
                                    ?<CustomButtonFriend className="CustomButtonFriend addFriend" value={select} onClick={addFriend}> + </CustomButtonFriend>
                                    :<CustomButtonFriend className="CustomButtonFriend discardFriend" value={select} onClick={discardFriend}> - </CustomButtonFriend>
                            }
                        </div>
                    </AuthFormBlock>
                </WhiteBox>
            </FormBody>
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

export default FriendDetail;
