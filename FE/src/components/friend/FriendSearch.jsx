import React, {useEffect, useState} from "react";
import FriendForm from "./FriendForm";
import FriendInfo from "./FriendInfo";
import axios from "axios";
import searchIcon from "../../assets/images/frield/searchIcon.svg";
import Swal from "sweetalert2";

const FriendSearch = ({friends, setFriends, select, setSelect, setSelectPage}) => {
    const baseURL = 'https://i9a608.p.ssafy.io:8000';
    const API = '/friend';

    const [form, setForm] = useState({
        id: "",
        search : 'id',
    });

    const [curStatus, setCurStatus] = useState(0)
    const [isValidSearch, setIsValidSearch] = useState(true);

    const showAlert = (title, text) => {
        Swal.fire({
            title,
            text,
        });
    };

    useEffect(() => {
        setFriends([]);
        setSelect("");
    }, []);

    function getFriendsByServer(searchId) {
        const accessToken = sessionStorage.getItem("accessToken")
        const Idx = sessionStorage.getItem("userIdx")

        const host_id = parseInt(Idx, 10);

        axios.get(`${baseURL}${API}/find/${searchId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    host_id: host_id
                }
            })
            .then((response) => {
                console.log('서버로부터 친구목록 가져오기 성공');
                setFriends([response.data]);
                setCurStatus(response.data.status);
            })
            .catch((error) => {
                console.error("서버로부터 친구목록 가져오기 실패", error);
                showAlert("error", "가입되지 않은 친구입니다.");
                console.error(error.code);

            });
    }

    // 검색
    const sendFriendDataServer = (e) => {
        e.preventDefault();

        const sendId = form.id;
        const sendSearch = form.search;

        if (sendId.length > 0) {
            getFriendsByServer(sendId);
        } else {
            setIsValidSearch(false);
        }
    };

    const handleChange = (updatedForm) => {
        setForm(updatedForm);
    };

    return (
        <div className="search_main">
            <div className="search_server_info">
                <div className="friend_form">
                    <FriendForm
                        form={form}
                        setForm={setForm}
                        setIsValidSearch={setIsValidSearch}
                        onChange={handleChange}
                    />
                </div>
                <div className="search_buttons">
                    <button onClick={sendFriendDataServer} className="search_friends_button button_front">
                        <div className="search_friends_button_cover">
                            <img src={searchIcon} alt="검색 아이콘" className="search_friends_button_img"/>
                        </div>
                    </button>
                </div>
            </div>
            <div className="search_server_info">
                {!isValidSearch && <div style={{ color: 'red' }}>한 글자 이상 입력해주세요</div>}
            </div>
            <div className="search_friend_list">
                <div className="search_friend_list_items">
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
                                <FriendInfo
                                    select={select}
                                    setSelect={setSelect}
                                    key={friends[0].userId}
                                    friend={friends[0]}
                                    curStatus={curStatus}
                                    setCurStatus={setCurStatus}
                                    imageUrl={friends[0].imgUrl}
                                />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default FriendSearch;
