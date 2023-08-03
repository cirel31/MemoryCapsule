import {AuthFormBlock, CustomButtonFriend, FormBody, WhiteBox} from "../../styles/friendStyle";
import React, {useState} from "react";
import Modal from "react-modal";
import FriendAddDeleteButton from "./FriendAddDeleteButton";

const FriendDetail = ({select, setSelect, closeFriendDetail}) => {

    return (
        <>
            <FormBody>
                <WhiteBox>
                    <AuthFormBlock>
                        <div onClick={closeFriendDetail}>
                            ✖
                        </div>
                        <div>
                            <h1>user Detail</h1>
                        </div>
                        <div>User img</div>
                        <div>{select.id}</div>
                        <div>
                            <div>친구가 현재까지 작성한 기록 {} 개</div>
                        </div>
                        <div>
                            <div>친구가 현재 제작중인 캡슐 {} 개</div>
                        </div>
                        {/*<div>*/}
                        {/*    {*/}
                        {/*        (1 === 1)*/}
                        {/*            ?<CustomButtonFriend className="CustomButtonFriend addFriend" value={select} onClick={addFriend}> + </CustomButtonFriend>*/}
                        {/*            :<CustomButtonFriend className="CustomButtonFriend discardFriend" value={select} onClick={discardFriend}> - </CustomButtonFriend>*/}
                        {/*    }*/}
                        {/*</div>*/}
                        <FriendAddDeleteButton select={select}/>
                    </AuthFormBlock>
                </WhiteBox>
            </FormBody>
        </>
    );
};

export default FriendDetail;
