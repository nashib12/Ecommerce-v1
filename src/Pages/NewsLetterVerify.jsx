import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/axios';

const NewsLetterVerify = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [ status, setStatus ] = useState("verifying");

    useEffect(() => {
        api.get(`/newsletter/verify/${token}`).then(() => {navigate('/');})
                .catch(() => { setStatus("invalid")});
    }, [token]);

    if (status === "invalid") {
        return <p>Token is invalid</p>
    }
  return (
    <p>Verifying your email address.</p>
  )
}

export default NewsLetterVerify