import {AuthFormBlock, CustomButtonFriend, FormBody, WhiteBox} from "../../styles/friendStyle";
import React, {useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import follower from "../../assets/images/frield/follower.svg";
import following from "../../assets/images/frield/following.svg";
import add_friend from "../../assets/images/frield/add_friend.svg";
import person from "../../assets/images/frield/person.svg";


const FriendAddDeleteButton = ({friend, status, from}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/friend';

    Modal.setAppElement("#root");

    const [curStatus, setCurStatus] = useState(status)
    const [friendModalIsOpen, setFriendModalIsOpen] = useState(0);

    /**
     * 1. 친구 추가
     *
     * Method : post
     * URL : /friend/add
     * param : * 토큰 필요 *
             - 추가하는 사람(host_id) : Number
             - 추가받는 사람(guest_id) : Number
     * */
    const addRequestFriend = () => {
        console.log("[addRequestFriend]");
        const accessToken = sessionStorage.getItem("accessToken")
        const host_id = parseInt(sessionStorage.getItem("userIdx"), 10);

        let guest_id = null;
        if (from === "FriendList"){
            guest_id = parseInt(friend.userId, 10);
        } else {
            guest_id = parseInt(friend.idx, 10);
        }

        console.log(host_id, guest_id)
        //https://i9a608.p.ssafy.io:8000/friend/add?guest_id=1014&host_id=2
        axios.post(`${baseURL}${API}/add?guest_id=${guest_id}&host_id=${host_id}`, null,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                console.log('서버로부터 친구 추가 성공');
                console.log("friend.status : ", friend.status)
                setCurStatus(2);
                setFriendModalIsOpen(1);
            })
            .catch((error) => {
                console.error("서버로부터 친구 추가 실패", error);
                console.error(error.code);
            });
    }

    /**
     * 2. 친구 추가 요청 취소
     *
     * Method : delete
     * URL : /friend/add
     * param : * 토큰 필요 *
     - 추가하는 사람(host_id) : Number
     - 추가받는 사람(guest_id) : Number
     * */
    const addRequestDiscardFriend = () => {
        console.log("[addRequestFriend]");
        const accessToken = sessionStorage.getItem("accessToken")
        const host_id = parseInt(sessionStorage.getItem("userIdx"), 10);

        let guest_id = null;
        if (from === "FriendList"){
            guest_id = parseInt(friend.userId, 10);
        } else {
            guest_id = parseInt(friend.idx, 10);
        }

        console.log(host_id, guest_id)
        //
        axios.delete(`${baseURL}${API}/add`,
            {
                params: {
                    guest_id:guest_id,
                    host_id:host_id
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                console.log('서버로부터 친구 추가 요청 취소 성공');
                console.log("friend.status : ", friend.status);
                setCurStatus(0);
                setFriendModalIsOpen(1);
            })
            .catch((error) => {
                console.error("서버로부터 친구 추가 요청 취소 실패", error);
                console.error(error.code);
            });
    }

    /**
     * 3. 친구 추가
     *
     * Method : put
     * URL : /friend/request
     * param : * 토큰 필요 *
     - 추가하는 사람(host_id) : Number
     - 추가받는 사람(guest_id) : Number
     * */
    const addFriend = () => {
        console.log("[addRequestFriend]");
        const accessToken = sessionStorage.getItem("accessToken")
        const host_id = parseInt(sessionStorage.getItem("userIdx"), 10);

        let guest_id = null;
        if (from === "FriendList"){
            guest_id = parseInt(friend.userId, 10);
        } else {
            guest_id = parseInt(friend.idx, 10);
        }

        console.log(host_id, guest_id)
        //https://i9a608.p.ssafy.io:8000/friend/add?guest_id=1014&host_id=2
        axios.put(`${baseURL}${API}/request?guest_id=${guest_id}&host_id=${host_id}`, null,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                console.log('친구 추가 성공');
                console.log("friend.status : ", friend.status)
                setCurStatus(1);
                setFriendModalIsOpen(1);
            })
            .catch((error) => {
                console.error("친구 추가 실패", error);
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
        console.log("[discardFriend]");

        const accessToken = sessionStorage.getItem("accessToken")
        const host_id = parseInt(sessionStorage.getItem("userIdx"), 10);

        let guest_id = null;
        if (from === "FriendList"){
            guest_id = parseInt(friend.userId, 10);
        } else {
            guest_id = parseInt(friend.idx, 10);
        }

        console.log("accessToken", accessToken);
        console.log("host_id", host_id);
        console.log("guest_id", guest_id);

        //https://i9a608.p.ssafy.io:8000/friend/delete?guest_id=1014&host_id=5
        // axios.delete(`${baseURL}${API}/delete`,
        axios.delete(`https://i9a608.p.ssafy.io:8000/friend/delete?host_id=1013&guest_id=1014`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                console.log('친구 삭제 성공');
                console.log("friend.status : ", friend.status);
                setCurStatus(0);
                setFriendModalIsOpen(2);    //친구 삭제
            })
            .catch((error) => {
                console.error("친구 삭제 실패", error);
                console.error(error.code);
            });
    }

    function statusButton() {
        console.log("from : ", from);

        const host_id = parseInt(sessionStorage.getItem("userIdx"), 10);
        const guest_id = parseInt(friend.userId, 10);

        if (host_id === guest_id) {
            return <button className="status_button discard_friend" value={friend.userId}> Me </button>
        }

        if (from === "FriendList"){
            switch (curStatus) {
                case 1 :    // 친구 삭제
                    return <button className="status_button discard_friend" value={friend.userId} onClick={discardFriend}> <img src={person} alt="now friend img" className="discard_friend_img"/> </button>
                case 2 :    // 친구추가요청 철회
                    return <button className="status_button following_friend" value={friend.userId} onClick={addRequestDiscardFriend}> <img src={following} alt="following img" className="following_friend_img"/> </button>
                case 3 :    //  친구 추가
                    return <button className="status_button follower_friend" value={friend.userId} onClick={addFriend}> <img src={follower} alt="follower img"  className="follower_friend_img"/></button>
                default:    // 친구추가요청
                    return <button className="status_button add_friend" value={friend.userId} onClick={addRequestFriend}> <img src={add_friend} alt="add_friend img"  className="add_friend_img"/> </button>
            }
        } else if (from === "FriendDetail") {
            switch (status) {
                case 1 :
                    return <button className="add_discard_button discard_detail_friend" value={friend.userId} onClick={discardFriend}> 친구 삭제 </button>
                case 2 :
                    return <button className="add_discard_button discard_detail_friend" value={friend.userId} onClick={addRequestFriend}> 내가 팔로우 중 </button>
                case 3 :
                    return <button className="add_discard_button discard_detail_friend" value={friend.userId} onClick={addRequestFriend}> 맞 팔로우 하기 </button>
                default:
                    return <button className="add_discard_button add_detail_friend" value={friend.userId} onClick={addRequestFriend}> 팔로우하기 </button>
            }
        } else {
            return <button> <img src="/Error 이미지" alt="Error 이미지"/> </button>
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
