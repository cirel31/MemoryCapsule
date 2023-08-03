import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FriendForm from "../../components/friend/FriendForm";
import FriendInfo from "../../components/friend/FriendInfo";
import FriendDetail from "../../components/friend/FriendDetail";
import {Link} from "react-router-dom";

const FriendListPage = () => {
    const API = '/friend/search';
    const [rowFriends, setRowFriends] = useState([]);
    const [friends, setFriends] = useState([]);

    const [form, setForm] = useState({
        id: "",
        search : 'id',
    });

    const [select, setSelect] = useState({
        id: "",
    });

    const closeFriendDetail = () => {
        setSelect({id : ""});
    }

    //======== Erase ========
    // 처음 한 번 실행 시, 내 친구 전부 불러오기
    // useEffect(() => {
    //     console.log('[useEffect] 페이지 로딩 시 한 번만 실행되는 함수');
    //     getFriends("", "");
    // }, []);
    //======== //Erase ========

    // 처음 한 번 실행 시, 내 친구 전부 불러오기
    useEffect(() => {
        console.log("[useEffect]");
        getFriends("id", "");
    }, []);


    function getFriends(searchId, searchValue) {
        console.log("[getFriends]");

        // 서버로부터 내 친구목록 가져오기
        // axios.get(`${API}/${user_id}`
        // axios.get(`${API}/jdragon@ssafy.com`)
        //     .then((response) => {
        //         console.log('서버로부터 친구목록 가져오기 성공');
        //         console.log(API);
        //         console.log(response.data);
        //         setFriends(response.data);
        //     })
        //     .catch((error) => {
        //         console.error("서버로부터 친구목록 가져오기 실패", error);
        //         console.error(error.code);
        //     });

        //======== Erase ========
        //test 데이터
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then((json) => {
                    setRowFriends(json);
                    setFriends(json);
                }
            );
        //======== //Erase ========

        console.log(searchId, searchValue);
    }

    // 검색
    const handleFriendData = (e) => {
        console.log("[handleFriendData]");
        e.preventDefault();
        const id = form.id.toLowerCase();
        const search = form.search;

        console.log("sendId", id);
        if (id === "") {
            for (let i = 0; i < rowFriends.length; i++) {
                console.log(rowFriends[i].name);
            }
            setFriends(rowFriends);
        } else {
            console.log("[제작예정] 불러온 친구 리스트 내부에서 검색");
            let searchFriend = [];

            searchFriend = rowFriends.filter((rowFriend) =>
                rowFriend.email.toLowerCase().includes(id)
            )
            console.log(searchFriend);
            setFriends(searchFriend);
        }
    };

    const handleChange = (updatedForm) => {
        console.log("[handleChange]");
        setForm(updatedForm);
    };

    return (
        <>
            <div>내 친구 page</div>
            <div>
                <FriendForm form={form} setForm={setForm} onChange={handleChange} />
            </div>
            <AuthFormGrid>
                <div className="AuthFormGrid">
                    <CustomButton onClick={handleFriendData}>
                        내부에서 찾기
                    </CustomButton>
                    <Link to={`/friend/search`}>
                        <CustomButton>
                            <strong>친구찾기</strong>
                        </CustomButton>
                    </Link>
                </div>
            </AuthFormGrid>
            <div>
                <div>등록된 친구</div>
                <div>{friends.length}</div>
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
            <div>
                {
                    !select.id
                        ?
                        <NoFriendList>
                            <div className="NoFriendList">
                                <div className="textBlock">
                                    <img src="../UserImg" alt="로고"/>
                                </div>
                            </div>
                        </NoFriendList>
                        :
                        // 스크롤 구현해야 하는 부분
                        <div>
                            <FriendDetail select={select} setSelect={setSelect} closeFriendDetail={closeFriendDetail}/>
                        </div>
                }
            </div>
        </>
    )
}

export default FriendListPage;
