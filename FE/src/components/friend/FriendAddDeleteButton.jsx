import {AuthFormBlock, CustomButtonFriend, FormBody, WhiteBox} from "../../styles/friendStyle";
import React, {useState} from "react";
import Modal from "react-modal";
import axios from "axios";

const FriendAddDeleteButton = ({friend, status, from}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/friend';

    const [friendModalIsOpen, setFriendModalIsOpen] = useState(0);

    /**
     * 3. 친구 추가
     *
     * Method : post
     * URL : /friend/add
     * param : * 토큰 필요 *
             - 추가하는 사람(host_id) : Number
             - 추가받는 사람(guest_id) : Number
     * */
    const addFriend = () => {
        console.log("[addFriend]");
        const accessToken = sessionStorage.getItem("accessToken")
        const host_id = parseInt(sessionStorage.getItem("userIdx"), 10);
        const guest_id = parseInt(friend.userId, 10);

        console.log(host_id, guest_id)

        // axios.post(`${baseURL}${API}/add`, null, {
        //     guest_id: guest_id,
        //     host_id: host_id
        // }, {
        // headers: {
        //     Authorization: `Bearer ${accessToken}`
        // }})
        axios.post(`${baseURL}${API}/add?guest_id=${guest_id}&host_id=${host_id}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                console.log('서버로부터 친구 추가 성공');
                setFriendModalIsOpen(1);
            })
            .catch((error) => {
                console.error("서버로부터 친구 추가 실패", error);
                console.error(error.code);
            });
    }

    /**
     * 4. 친구 삭제
     *
     * Method : delete
     * URL : /friend/delete
     * param : * 토큰 필요 *
     - 삭제하는 사람(host_id) : Number
     - 삭제 할 사람(guest_id) : Number
     * */
    const discardFriend = () => {
        console.log("[discardFriend] : ");

        const accessToken = sessionStorage.getItem("accessToken");
        const host_id = sessionStorage.getItem("userIdx")*1;
        const guest_id = friend.userId*1;

        console.log("host_id", host_id);
        console.log("guest_id", guest_id);

        // axios.delete(`${baseURL}${API}/delete`, null,
        //     {
        //         guest_id: guest_id,
        //         host_id: host_id,
        //     },
        //     {
        //         headers: {
        //             Authorization: `Bearer ${accessToken}`
        //         },
        //     })
        axios.delete(`${baseURL}${API}/delete?guest_id=${guest_id}&host_id=${host_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                })
            .then((response) => {
                console.log('서버로부터 친구 삭제 성공');
                setFriendModalIsOpen(2);    //친구 삭제
            })
            .catch((error) => {
                console.error("서버로부터 친구 삭제 실패", error);
                console.error(error.code);
            });
    }

    function statusButton() {
        const host_id = sessionStorage.getItem("userIdx")*1;
        const guest_id = friend.userId*1;
        
        if (host_id === guest_id) {
            return <button className="add_discard_button add_friend" value={friend.userId}> 본인입니다 </button>
        }
        if (from === "FriendInfo"){
            switch (status) {
                case 1 :
                    return <button className="status_button discard_friend" value={friend.userId} onClick={discardFriend}> <img src="../친구추가2_이미지" alt="친구삭제 이미지" /> </button>
                case 2 :
                    return <button className="status_button add_friend" value={friend.userId} onClick={addFriend}> <img src="../팔로우 중인 친구 이미지" alt="팔로우 중인 친구 이미지" /> </button>
                case 3 :
                    return <button className="status_button add_friend" value={friend.userId} onClick={addFriend}> <img src="../나를 팔로우하는 친구 이미지" alt="나를 팔로우하는 친구 이미지" /></button>
                default:
                    return <button className="status_button add_friend" value={friend.userId} onClick={addFriend}> <img src="../친구추가 이미지" alt="친구추가 이미지" /> </button>
            }
        } else if (from === "FriendDetail") {
            switch (status) {
                case 1 :
                    return <button className="add_discard_button discard_detail_friend" value={friend.userId} onClick={discardFriend}> 친구삭제 글자 </button>
                default:
                    return <button className="add_discard_button add_detail_friend" value={friend.userId} onClick={addFriend}> 친구추가 글자 </button>
            }
        } else {
            return <button> Error 이미지 </button>
        }
    }

    return (
        <>
            {console.log(friend.userId)}
            <div className="friend_add_delete_button">
                {
                    statusButton()
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
