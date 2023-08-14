import { NoFriendList, AuthFormGrid, CustomButton } from "../../styles/friendStyle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FriendForm from "./FriendForm";
import FriendInfo from "./FriendInfo";
import FriendDetail from "./FriendDetail";
import "../../styles/friendStyle.scss";
import brand_gradation from "../../assets/images/frield/brand_gradation.svg"
import searchIcon from "../../assets/images/frield/searchIcon.svg"
import {login} from "../../store/userSlice";

const FriendList = ({rowFriends, setRowFriends, select, setSelect, setSelectPage}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/friend';

    const [friends, setFriends] = useState([]);

    const [form, setForm] = useState({
        id: "",
        search : 'id',
    });

    const [isValidSearch, setIsValidSearch] = useState(true);

    const closeFriendDetail = () => {
        setSelect({id : ""});
    }

    // 처음 한 번 실행 시, 내 친구 전부 불러오기
    useEffect(() => {
        console.log("[useEffect]");
        setSelect("");
        getDetailedFriendList();
        console.log("login : ", login);
    }, []);

    useEffect(() => {
        console.log("[useEffect : select]");
        getDetailedFriendList();
    }, [select]);

    /**
     5. 친구 상세목록 불러오기
     /friend/getDetailedFriendList/{userId}	친구들의 글목록/작성글수/프로젝트수 조회
     * 토큰 필요 *
     사용자고유ID(userId) : Number

     [{
     "idx": Number,
     "name": String,
     "nickname": String,
     "imgUrl": String,
     "totalWriteCnt": Number ,      //작성한 Article 총수
     "totalInProjectCnt": Number,   //진행중인 프로젝트 총수
     "totalProjectCnt": Number      //총 프로젝트 수
     }]
     - idx: user id
     - name: user
     */

    const getDetailedFriendList = () => {
        console.log("[addFriend]");
        const accessToken = sessionStorage.getItem("accessToken")
        const user_id = parseInt(sessionStorage.getItem("userIdx"), 10);

        console.log(user_id)
        ///friend/getDetailedFriendList/{userId}
        axios.get(`${baseURL}${API}/getDetailedFriendList/${user_id}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                console.log('친구 상세목록 불러오기 성공');
                console.log("friend.status : ", response)
                console.log("response.data : ", response.data);
                setRowFriends(response.data);
                setFriends(response.data);
            })
            .catch((error) => {
                console.error("친구 상세목록 불러오기 실패", error);
                console.error(error.code);
            });
    }

    // 검색
    const handleFriendData = (e) => {
        console.log("[handleFriendData]");
        e.preventDefault();
        console.log(form.id);
        const id = form.id.toLowerCase();
        const search = form.search;

        if (id === "") {
            for (let i = 0; i < rowFriends.length; i++) {
                console.log(rowFriends[i].name);
            }
            setFriends(rowFriends);
        } else {
            setFriends([]);
            var curFriend = rowFriends.filter((rowFriend) =>
                rowFriend.nickname.toLowerCase().includes(form.id)
            )
            console.log(curFriend);
            setFriends(curFriend)
        }
    };

    const handleChange = (updatedForm) => {
        console.log("[handleChange]");
        setForm(updatedForm);
    };

    // searchPage로 이동
    const searchPage = () => {
        setSelectPage(true);
    }

    return (
        <>
            <div className="search_info">
                <div className="friend_counter">
                    <div className="friend_counter_text">등록된 친구</div>
                    <div className="friend_counter_text">{friends.length}</div>
                </div>
                <div className="friend_form">
                    <FriendForm
                        form={form}
                        setForm={setForm}
                        setIsValidSearch={setIsValidSearch}
                        onChange={handleChange}
                    />
                </div>
                <div className="search_buttons">
                    <button onClick={handleFriendData} className="search_friends_button button_front">
                        <div className="search_friends_button_cover">
                            <img src={searchIcon} alt="검색 아이콘" className="search_friends_button_img"/>
                        </div>
                    </button>
                    <button onClick={searchPage} className="search_friends_button button_server">
                        친구찾기
                    </button>
                </div>
            </div>
            <div className="friendList">
                <div className="friendListItems">
                    {
                        friends.length === 0
                        ?
                        <div className="no_friend_list">
                            <div className="textBlock">
                                새로운 친구를 찾아보세요
                            </div>
                        </div>
                        // 스크롤 구현해야 하는 부분
                        :<div>
                            { friends.map((friend) => (
                                <FriendInfo
                                    key={friend.id}
                                    from="FriendList"
                                    select={select}
                                    setSelect={setSelect}
                                    friend={friend}
                                    imageUrl={friend.imgUrl}
                                />
                            ))}
                        </div>
                    }
                </div>
                <div className="friendDetailItems">
                    {
                        !select.idx
                        ?
                        <div className="no_friend_list">
                            <div className="textBlock">
                                <img src={brand_gradation} alt="로고" className="brand_logo"/>
                            </div>
                        </div>
                        :
                        <FriendDetail select={select} setSelect={setSelect} closeFriendDetail={closeFriendDetail}/>
                    }
                </div>
            </div>
        </>
    )
}

export default FriendList;
