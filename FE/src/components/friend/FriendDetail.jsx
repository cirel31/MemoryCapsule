import { AuthFormBlock, FormBody, WhiteBox } from "../../styles/friendStyle";
import {StyledSearchBar} from "../../styles/searchBarStyle";
import React from "react";

const FriendDetail = ({select}) => {
    return (
        <>
            <FormBody>
                <WhiteBox>
                    <AuthFormBlock>
                        <div>
                            <h1>user Detail</h1>
                        </div>
                        <div>{select.id}</div>
                    </AuthFormBlock>
                </WhiteBox>
            </FormBody>
        </>
    );
};

export default FriendDetail;
