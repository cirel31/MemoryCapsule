import { AuthFormBlock, StyledInput, CustomButton, FormBody, WhiteBox } from "../../styles/friendStyle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const FriendForm = ({ form, setForm }) => {
    const navigate = useNavigate();
    const [isValidId, setIsValidId] = useState(true);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidNickname, setIsValidNickname] = useState(true);

    form.search = "id";

    const friends = {
        data: [{
            id: 'friend1@gmail.com',
            name: '친구1',
            nickname: '친구닉1'
        }, {
            id: 'friend2@naver.com',
            name: '친구2',
            nickname: '친구닉2'
        }, {
            id: 'friend3@daum.com',
            name: '친구3',
            nickname: '친구닉3'
        }]
    }

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

    const handleFriendData = (e) => {
        e.preventDefault();
        const sendId = form.id;
        const sendSearch = form.search;

        if (sendId === "") {
            for (let i = 0; i < friends.data.length; i++) {
                console.log(sendId);
                console.log(sendSearch);
            }
        } else {
            for (let i = 0; i < friends.data.length; i++) {
                if(form.id === friends.data[i].id){
                    console.log(sendId);
                    console.log(sendSearch);
                    break;
                }
            }
        }
    };

    const validateId = (id) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(id);
    };
    const validateName = (name) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(name);
    };
    const validateNickname = (nickname) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]/;
        return emailPattern.test(nickname);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(form);
        setForm({ ["id"]:form.id, [id]: value});
    };

    const valueChange = (e) => {
        const { id, value } = e.target;
        setForm({ [id]: value, ["search"]:form.search});
        console.log(form);

        if (e.target.id === 'id') {
            setIsValidId(validateId(value));
        }
        else if (e.target.id === 'name') {
            setIsValidName(validateName(value));
        }
        else if (e.target.id === 'nickname') {
            setIsValidNickname(validateNickname(value));
        }
    };

    return (
        <FormBody>
            <WhiteBox>
                <AuthFormBlock>
                    <form>
                        <label htmlFor="search">친구찾기 페이지</label>
                        <select id="search" name="search" onChange={handleChange}>
                            <option value={"id"}>id(e-mail)</option>
                            <option value={"name"}>name</option>
                            <option value={"nickname"}>nickname</option>
                        </select>
                        <StyledInput
                            id="id"
                            placeholder="여기에 입력하세요"
                            value={form.id}
                            onChange={valueChange}
                            required
                        />
                        {/*{!isValidEmail && <div style={{ color: 'red' }}>올바른 이메일 형식이 아닙니다.</div>}*/}
                        <CustomButton style={{ marginTop: '1rem' }} onClick={sendFriendDataServer}>
                            서버에서 찾기
                        </CustomButton>
                        <CustomButton style={{ marginTop: '1rem' }} onClick={handleFriendData}>
                            내부에서 찾기
                        </CustomButton>
                    </form>
                </AuthFormBlock>
            </WhiteBox>
        </FormBody>
    );
};

export default FriendForm;
