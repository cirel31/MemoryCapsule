import { AuthFormBlock, FormBody, WhiteBox } from "../styles/friendStyle";
import {StyledSearchBar} from "../styles/searchBarStyle";

const SearchBar = ({search, setSearch}) => {
    const validateSearchValue = (searchValue) => {
        const pattern = /^[a-zA-Z0-9._%+-]/;
        return pattern.test(searchValue);
    };

    const valueChange = (e) => {
        const { value } = e.target;
        setSearch(value);
        console.log("valueSearch : ", search);

    };

    return (
        <>
            <FormBody>
                <WhiteBox>
                    <AuthFormBlock>
                        <form>
                            <StyledSearchBar
                                id="id"
                                placeholder="여기에 입력하세요"
                                onChange={valueChange}
                                required
                            />
                        </form>
                    </AuthFormBlock>
                </WhiteBox>
            </FormBody>
        </>
    );
};

export default SearchBar;
