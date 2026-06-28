import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/axios';

const NewsLetterUnsubscribe = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [ status, setStatus ] = useState("vrefiying");

    useEffect(() => {
        api.get(`newsletter/unsubscribe/${token}`).then(() => navigate('/'))
            .catch(() => setStatus("invalid"));
    }, [token]);

    if (status === "invalid") {
        return <p>Invalid token.</p>
    }
  return (
    <p>Successfully unsubscribed to the newesletter.</p>
  )
}

export default NewsLetterUnsubscribe