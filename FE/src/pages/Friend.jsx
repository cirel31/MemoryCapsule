import { FreindEditor, FriendList, FriendItem, AuthFormBlock, StyledInput, CustomButton, FormBody, WhiteBox } from "../styles/friendStyle";

import React, { useState } from "react";
import FriendForm from "../components/friend/FriendForm";
import FriendInfo from "../components/common/FriendInfo";
import axios from "axios";

const FriendPage = () => {
    const [form, setForm] = useState({
        id: "",
        search : 'id',
    });

    const [friends, setFriends] = useState([{
        id : "test",
        name : "test",
        username : "test",
        email : "test@test.com",
        address : "test",
        phone : "010-0000-0000",
        website : "test",
    }]);

    const sendFriendDataServer = (e) => {
        e.preventDefault();
        const sendId = form.id;
        const sendSearch = form.search;

        if (sendId.length > 0) {
            console.log(sendId);
            console.log(sendSearch);
        } else {
            console.log("한 글자라도 입력해주십시오");
        }

        if (sendId.length > 0) {
            const friendData = {
                id: sendId,
                search: sendSearch
            }
            // 실제 배포는 8000
            // 테스트 및 개발 서버는 7000
            axios.post("http://localhost:7000/", friendData)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error("에러 발생", error)
                })
        }
    };

    //test data
    function getFriends(searchId, searchValue) {
        console.log("getFriends");
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then((json) => {
                setFriends(json);
            });
        console.log(searchId, searchValue);
        console.log(friends);
    }


    // 검색
    const handleFriendData = (e) => {
        e.preventDefault();
        const sendId = form.id;
        const sendSearch = form.search;

        console.log("sendId", sendId);
        if (sendId === "") {
            getFriends(sendId, sendSearch);
            console.log("  ", friends);
            for (let i = 0; i < friends.length; i++) {
                console.log(friends[i].name);
            }
        } else {
            console.log("friends -", friends);
            // for (let i = 0; i < friends.length; i++) {
            //     if(form.id === friends[i].name){
            //         setFriends([friends[i]]);
            //         console.log("setFriends", friends.length);
            //         break;
            //     }
            // }
        }
    };

    const handleChange = (updatedForm) => {
        setForm(updatedForm);
    };

    return (
        <>
            <div>
                <FriendForm form={form} setForm={setForm} onChange={handleChange} />
            </div>
            <div>
                <CustomButton style={{ marginTop: '1rem' }} onClick={sendFriendDataServer}>
                    서버에서 찾기
                </CustomButton>
                <CustomButton style={{ marginTop: '1rem' }} onClick={handleFriendData}>
                    내부에서 찾기
                </CustomButton>
            </div>
            <div>
                { friends.map((friend) => (
                    <FriendInfo key={friend.id} {...friend} />
                ))}

                {/*<ul style={{textAlign: 'center'}}>*/}
                {/*    { friends.map((friend) => (*/}
                {/*        <li key={friend.id}> <span>friend.id = {friend.id} | friend.name = {friend.name}  | friend.username = {friend.username} </span></li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
            </div>
        </>
    )
}

export default FriendPage;
