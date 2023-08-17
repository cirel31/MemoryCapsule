import {AuthFormBlock, CustomButtonFriend, FormBody, WhiteBox} from "../../styles/friendStyle";
import React, {useState} from "react";
import Modal from "react-modal";
import axios from "axios";
import follower from "../../assets/images/frield/follower.svg";
import following from "../../assets/images/frield/following.svg";
import add_friend from "../../assets/images/frield/add_friend.svg";
import person from "../../assets/images/frield/person.svg";
import Swal from "sweetalert2";


const FriendAddDeleteButton = ({friend, status, curStatus, setCurStatus, from}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/friend';

    Modal.setAppElement("#root");

    const [friendModalIsOpen, setFriendModalIsOpen] = useState(0);

    /**
     * 1. 친구 추가
     * */
    const addRequestFriend = () => {
        const accessToken = sessionStorage.getItem("accessToken")
        const host_id = parseInt(sessionStorage.getItem("userIdx"), 10);

        let guest_id = null;
        if (from === "FriendList"){
            guest_id = parseInt(friend.userId, 10);
        } else {
            guest_id = parseInt(friend.idx, 10);
        }

        axios.post(`${baseURL}${API}/add?guest_id=${guest_id}&host_id=${host_id}`, null,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                console.log('서버로부터 친구 추가 성공');
                // console.log("friend.status : ", friend.status)
                showAlert("success", "친구 추가되었습니다.");
                setCurStatus(2);
            })
            .catch((error) => {
                console.error("서버로부터 친구 추가 실패", error);
                showAlert("error", "친구 실패입니다.");
                console.error(error.code);
            });
    }

    /**
     * 2. 친구 추가 요청 취소
     * */
    const addRequestDiscardFriend = () => {
        const accessToken = sessionStorage.getItem("accessToken")
        const host_id = parseInt(sessionStorage.getItem("userIdx"), 10);

        let guest_id = null;
        if (from === "FriendList"){
            guest_id = parseInt(friend.userId, 10);
        } else {
            guest_id = parseInt(friend.idx, 10);
        }

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
                // console.log("friend.status : ", friend.status);
                showAlert("success", "친구 추가 요청 취소 성공입니다.");
                setCurStatus(0);
            })
            .catch((error) => {
                console.error("서버로부터 친구 추가 요청 취소 실패", error);
                showAlert("error", "친구 추가 요청 취소  실패입니다.");
                console.error(error.code);
            });
    }

    /**
     * 2. 친구 추가 요청 거절
     * */
    const addRequestRejectFriend = () => {
        const accessToken = sessionStorage.getItem("accessToken")
        const host_id = parseInt(sessionStorage.getItem("userIdx"), 10);

        let guest_id = null;
        if (from === "FriendList"){
            guest_id = parseInt(friend.userId, 10);
        } else {
            guest_id = parseInt(friend.idx, 10);
        }

        axios.delete(`${baseURL}${API}/request`,
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
                console.log('서버로부터 친구 추가 요청 거절 성공');
                // console.log("friend.status : ", friend.status);
                showAlert("success", "친구 추가 요청 거절 성공입니다.");
                setCurStatus(0);
            })
            .catch((error) => {
                console.error("서버로부터 친구 추가 요청 거절 실패", error);
                showAlert("error", "친구 추가 요청 거절 실패입니다.");
                console.error(error.code);
            });
    }

    /**
     * 3. 친구 추가
     * */
    const addFriend = () => {
        const accessToken = sessionStorage.getItem("accessToken")
        const host_id = parseInt(sessionStorage.getItem("userIdx"), 10);

        let guest_id = null;
        if (from === "FriendList"){
            guest_id = parseInt(friend.userId, 10);
        } else {
            guest_id = parseInt(friend.idx, 10);
        }

        axios.put(`${baseURL}${API}/request?guest_id=${guest_id}&host_id=${host_id}`, null,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                console.log('친구 추가 성공');
                // console.log("friend.status : ", friend.status)
                showAlert("success", "친구 추가 성공입니다.");
                setCurStatus(1);
            })
            .catch((error) => {
                console.error("친구 추가 실패", error);
                showAlert("error", "친구 추가 실패입니다.");
                console.error(error.code);
            });
    }

    /**
     * 4. 친구 삭제
     * */
    const discardFriend = () => {
        const accessToken = sessionStorage.getItem("accessToken")
        const host_id = parseInt(sessionStorage.getItem("userIdx"), 10);

        let guest_id = null;
        if (from === "FriendList"){
            guest_id = parseInt(friend.userId, 10);
        } else {
            guest_id = parseInt(friend.idx, 10);
        }

        axios.delete(`https://i9a608.p.ssafy.io:8000/friend/delete?host_id=${host_id}&guest_id=${guest_id}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                console.log('친구 삭제 성공');
                // console.log("friend.status : ", friend.status);
                setCurStatus(0);
                setFriendModalIsOpen(2);    //친구 삭제
            })
            .catch((error) => {
                console.error("친구 삭제 실패", error);
                console.error(error.code);
            });
    }

    const showAlert = (title, text) => {
        Swal.fire({
            title,
            text,
        });
    };

    function statusButton() {
        const host_id = parseInt(sessionStorage.getItem("userIdx"), 10);
        const guest_id = parseInt(friend.userId, 10);

        if (host_id === guest_id) {
            return <button className="status_button discard_friend" value={friend.userId}> Me </button>
        }

        if (from === "FriendList"){
            // console.log("status :", status)
            switch (curStatus) {
                case 1 :    // 친구 삭제
                    return <button className="status_button discard_friend" value={friend.userId} onClick={discardFriend}> <img src={person} alt="now friend img" className="discard_friend_img"/> </button>
                case 2 :    // 친구추가요청 철회
                    return <button className="status_button following_friend" value={friend.userId} onClick={addRequestDiscardFriend}> <img src={following} alt="following img" className="following_friend_img"/> </button>
                case 3 :    //  친구 추가
                    return <button className="status_button follower_friend" value={friend.userId} onClick={addFriend}>
                        <img src={follower} alt="follower img"  className="follower_friend_img"/>
                    </button>
                default:    // 친구추가요청
                    return <button className="status_button add_friend" value={friend.userId} onClick={addRequestFriend}> <img src={add_friend} alt="add_friend img"  className="add_friend_img"/> </button>
            }
        } else if (from === "FriendDetail") {
            switch (curStatus) {
                case 1 :    // 친구 삭제
                    return <button className="add_discard_button discard_detail_friend" value={friend.userId} onClick={discardFriend}> 친구 삭제 </button>
                case 2 :    // 친구추가요청 철회
                    return <>
                        <button className="add_discard_button discard_detail_friend" value={friend.userId} onClick={addRequestDiscardFriend}> 팔로우 중 </button>
                    </>
                case 3 :    //  친구 추가
                    return <>
                        <button className="add_discard_button discard_detail_friend" value={friend.userId} onClick={addRequestRejectFriend}> 팔로우 거절 </button>
                        <button className="add_discard_button follower_detail_friend" value={friend.userId} onClick={addFriend}> 맞 팔로우 하기 </button>
                    </>
                default:    // 친구추가요청
                    return <button className="add_discard_button add_detail_friend" value={friend.userId} onClick={addRequestFriend}> 팔로우하기 </button>
            }
        } else {
            return <button> <img src="/Error 이미지" alt="Error 이미지"/> </button>
        }
    }

    return (
        <>
            <div className="friend_add_delete_button">
                {
                    statusButton()
                }
            </div>
        </>
    );
};

export default FriendAddDeleteButton;
