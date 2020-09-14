import React, { useEffect } from "react";
import axios from "axios";
import { history } from "../helpers";
const id = window.location.pathname.split("/")[2];

const VerifyEmail = () => {
    useEffect(() => {
        const verifyEmail = async () => {
            await axios.get(`/api/user/verify_email?id=${id}`, { withCredentials: true });
            history.push("/?verify=true");
        }
        verifyEmail();
    }, []);

    return <div></div>;
}

export default VerifyEmail;