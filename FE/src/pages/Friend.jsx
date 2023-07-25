import React, { useState } from "react";
import FriendForm from "../components/friend/FriendForm";

const FriendPage = () => {
    const [form, setForm] = useState({
        id: "",
        search: "",
    });

    const handleChange = (updatedForm) => {
        setForm(updatedForm);
    };

    return (
        <>
            <div>
                <FriendForm form={form} setForm={setForm} onChange={handleChange} />
            </div>
        </>
    )
}

export default FriendPage;
