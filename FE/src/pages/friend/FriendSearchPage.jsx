import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";

import React, { useState } from "react";
import FriendForm from "../../components/friend/FriendForm";
import FriendInfo from "../../components/friend/FriendInfo";
import FriendDetail from "../../components/friend/FriendDetail";
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

    const [isValidSearch, setIsValidSearch] = useState(true);

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

    const sendFriendDataServer = (e) => {
        console.log("[sendFriendDataServer]");

        e.preventDefault();

        const sendId = form.id;
        const sendSearch = form.search;

        if (sendId.length > 0) {
            console.log(sendId, " : ", sendSearch);
            getFriends();
        } else {
            console.log("한 글자라도 입력해주십시오");
            console.log("getAllFriends")
            setIsValidSearch(false);
        }
    };


    const validateSearchValue = (searchValue) => {
        console.log("[validateSearchValue]");

        if (!searchValue) {
            console.log("!searchValue ", searchValue);
            return false;
        }
        const pattern = /^[a-zA-Z0-9._%+-]/;
        return pattern.test(searchValue);
    };

    const handleChange = (updatedForm) => {
        console.log("[handleChange]");
        setForm(updatedForm);
    };

    return (
        <>
            <div>친구찾기 page</div>
            <div>
                <FriendForm form={form} setForm={setForm} onChange={handleChange} isValidSearch={isValidSearch} setIsValidSearch={setIsValidSearch} />
            </div>
            <AuthFormGrid>
                <div className="AuthFormGrid">
                    <CustomButton onClick={sendFriendDataServer}>
                        서버에서 찾기
                    </CustomButton>
                </div>
            </AuthFormGrid>
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
