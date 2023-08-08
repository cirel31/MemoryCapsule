import { AuthFormBlock, FormBody, WhiteBox } from "../../styles/friendStyle";
import {StyledSearchBar} from "../../styles/searchBarStyle";

const FriendForm = ({form, setForm, setIsValidSearch}) => {

    // const handleChange = (e) => {
    //     const { value } = e.target;
    //         const nextForm = {
    //         ...form,
    //         "search" : value,
    //     };
    //     setForm(nextForm);
    //     console.log("handleChange : ", form);
    // };

    const valueChange = (e) => {
        const { value } = e.target;
        const nextForm = {
            ...form,
            "id" : value?value:"",
        };
        setForm(nextForm);
        console.log("valueChange : ", form);
        setIsValidSearch(true);
    };

    return (
        <>
            <form className="friend_form_info">
                {/*<select id="search" name="search" onChange={handleChange}>*/}
                {/*    <option value={"id"}>e-mail</option>*/}
                {/*    <option value={"name"}>name</option>*/}
                {/*    <option value={"nickname"}>nickname</option>*/}
                {/*</select>*/}

                <StyledSearchBar
                    className="styled_search_bar"
                    id="id"
                    placeholder="여기에 입력하세요"
                    value={form.id}
                    onChange={valueChange}
                    required
                />
            </form>
        </>
    );
};

export default FriendForm;
