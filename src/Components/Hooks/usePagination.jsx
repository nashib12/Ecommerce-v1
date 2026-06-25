import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const usePagination = ( url ) => {
    const [ data, setData] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ lastPage, setLastPage ] = useState(1);
    const [ total, setTotal ] = useState(0);
    const [perPage, setPerPage ] = useState(0)
    const [ loading, setLoading ] = useState(false);

    const fetchPage = useCallback(async (page) => {
        if(!url) return;
        setLoading(true);
        try {
            const response = await axios.get(url, {
                params: {page}, 
            });
            if (response.status === 200) {
                setData(response.data.data.data);
                setCurrentPage(response.data.data.current_page);
                setLastPage(response.data.data.last_page);
                setTotal(response.data.data.total);
                setPerPage(response.data.data.to)
            }
        } catch (error) {
            toast.error( 'Something went wrong 123.');
            console.log(error);
        }
        setLoading(false)
    }, [url]);

    useEffect(() => { fetchPage(1); }, [fetchPage]);
  return {data, currentPage, lastPage, total, fetchPage, perPage, loading};
}

export default usePagination