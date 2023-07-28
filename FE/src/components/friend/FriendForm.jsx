import { AuthFormBlock, FormBody, WhiteBox } from "../../styles/friendStyle";
// import {StyledSearchBar} from "../../styles/searchBarStyle";

import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const FriendForm = ({form, setForm}) => {
    const navigate = useNavigate();

    const validateSearchValue = (searchValue) => {
        const pattern = /^[a-zA-Z0-9._%+-]/;
        return pattern.test(searchValue);
    };

    const handleChange = (e) => {
        const { value } = e.target;
            const nextForm = {
            ...form,
            "search" : value,
        };
        setForm(nextForm);
        console.log("handleChange : ", form);
    };

    const valueChange = (e) => {
        const { value } = e.target;
        const nextForm = {
            ...form,
            "id" : value?value:"",
        };
        setForm(nextForm);
        console.log("valueChange : ", form);

    };

    return (
        <>
            <FormBody>
                <WhiteBox>
                    <AuthFormBlock>
                        <form>
                            <label htmlFor="search">친구찾기 페이지</label>
                            <select id="search" name="search" onChange={handleChange}>
                                <option value={"id"}>e-mail</option>
                                <option value={"name"}>name</option>
                                <option value={"nickname"}>nickname</option>
                            </select>

                            {/*<StyledSearchBar*/}
                            {/*    id="id"*/}
                            {/*    placeholder="여기에 입력하세요"*/}
                            {/*    value={form.id}*/}
                            {/*    onChange={valueChange}*/}
                            {/*    required*/}
                            {/*/>*/}
                        </form>
                    </AuthFormBlock>
                </WhiteBox>
            </FormBody>
        </>
    );
};

export default FriendForm;
