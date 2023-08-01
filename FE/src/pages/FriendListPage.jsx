import { NoFriendList, AuthFormGrid, CustomButton } from "../styles/friendStyle";

import React, { useState } from "react";
import FriendForm from "../components/friend/FriendForm";
import FriendInfo from "../components/friend/FriendInfo";
import FriendDetail from "../components/friend/FriendDetail";
import axios from "axios";

const FriendListPage = () => {
    const [form, setForm] = useState({
        id: "",
        search : 'id',
    });

    const [select, setSelect] = useState({
        id: "",
    });

    const [friends, setFriends] = useState([]);

    const sendFriendDataServer = (e) => {
        console.log("[sendFriendDataServer]");

        e.preventDefault();

        const sendId = form.id;
        const sendSearch = form.search;

        if (sendId.length > 0) {
            console.log(sendId, " : ", sendSearch);
        } else {
            console.log("한 글자라도 입력해주십시오");
            console.log("getAllFriends")
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
        console.log("[getFriends]");
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
        console.log("[handleFriendData]");
        e.preventDefault();
        const sendId = form.id;
        const sendSearch = form.search;

        console.log("sendId", sendId);
        if (sendId === "") {
            getFriends(sendId, sendSearch);
            for (let i = 0; i < friends.length; i++) {
                console.log(friends[i].name);
            }
        } else {
            console.log("[제작예정] 불러온 친구 리스트 내부에서 sort");
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
        console.log("[handleChange]");
        setForm(updatedForm);
    };

    return (
        <>
            <div>
                <FriendForm form={form} setForm={setForm} onChange={handleChange} />
            </div>
            <AuthFormGrid>
                <div className="AuthFormGrid">
                    <CustomButton onClick={sendFriendDataServer}>
                        서버에서 찾기
                    </CustomButton>
                    <CustomButton onClick={handleFriendData}>
                        내부에서 찾기
                    </CustomButton>
                </div>
            </AuthFormGrid>
            <div>
                <div>등록된 친구</div>
                <div>{friends.length}</div>
            </div>
            <div>
                {
                    !select.id
                    ?
                        <NoFriendList>
                            <div className="NoFriendList">
                                <div className="textBlock">
                                    <h1>선택된 친구가 없습니다.</h1>
                                </div>
                            </div>
                        </NoFriendList>
                    :<FriendDetail select={select} setSelect={setSelect}/>
                }
            </div>
            <AuthFormGrid>
                {
                    friends.length === 0
                    ?
                    <NoFriendList>
                        <div className="NoFriendList">
                            <div className="textBlock">
                                새로운 친구를 찾아보세요
                            </div>
                        </div>
                    </NoFriendList>
                    :<div className="AuthFormGrid">
                        { friends.map((friend) => (
                            <FriendInfo select={select} setSelect={setSelect} key={friend.id} {...friend} />
                        ))}
                    </div>
                }
            </AuthFormGrid>
        </>
    )
}

export default FriendListPage;
