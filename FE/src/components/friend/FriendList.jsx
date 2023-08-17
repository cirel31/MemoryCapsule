import axios from "axios";
import React, { useEffect, useState } from "react";
import FriendForm from "./FriendForm";
import FriendInfo from "./FriendInfo";
import FriendDetail from "./FriendDetail";
import "../../styles/friendStyle.scss";
import brand_gradation from "../../assets/images/frield/brand_gradation.svg"
import searchIcon from "../../assets/images/frield/searchIcon.svg"

const FriendList = ({rowFriends, setRowFriends, select, setSelect, setSelectPage}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/friend';

    const [toggle, setToggle] = useState(false);
    const [friends, setFriends] = useState([]);
    const [newFriends, setNewFriends] = useState([]);

    const [form, setForm] = useState({
        id: "",
        search : 'id',
    });

    const [isValidSearch, setIsValidSearch] = useState(true);

    const closeFriendDetail = () => {
        setSelect({id : ""});
    }

    useEffect(() => {
        setSelect("");
        getDetailedFriendList();
    }, []);

    useEffect(() => {
        setNewFriends(rowFriends.filter((curFriend) => {
            return curFriend.status !== 1;
        }));
    }, [rowFriends])

    useEffect(() => {
        if (toggle) {
            setFriends(newFriends)
        } else {
            setFriends(rowFriends)
        }
    }, [toggle]);

    /**
     5. 친구 상세목록 불러오기
     */

    const getDetailedFriendList = () => {
        const accessToken = sessionStorage.getItem("accessToken")
        const user_id = parseInt(sessionStorage.getItem("userIdx"), 10);

        ///friend/getDetailedFriendList/{userId}
        axios.get(`${baseURL}${API}/getDetailedFriendList/${user_id}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((response) => {
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
        e.preventDefault();
        const id = form.id.toLowerCase();
        const search = form.search;

        if (id === "") {
            setFriends(rowFriends);
        } else {
            setFriends([]);
            var curFriend = rowFriends.filter((rowFriend) =>
                rowFriend.nickname.toLowerCase().includes(form.id)
            )
            setFriends(curFriend)
        }
    };

    const handleChange = (updatedForm) => {
        setForm(updatedForm);
    };

    const toggleState = () => {
        if (toggle) {
            setToggle(false)
        } else {
            setToggle(true)
        }
    }

    // searchPage로 이동
    const searchPage = () => {
        setSelectPage(true);
    }

    return (
        <>
            <div className="search_info">
                <div className="friend_counter">
                    <div className="friend_counter_text">등록된 친구</div>
                    <div className="friend_counter_text">{friends.length - newFriends.length}</div>
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
            <input type="checkbox" id="toggle" onChange={() => toggleState()} hidden/>
            <label htmlFor="toggle" className="toggleSwitch">
                <span className="toggleButton">{newFriends.length}</span>
            </label>
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
