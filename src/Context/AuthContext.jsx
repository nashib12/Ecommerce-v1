import React, { createContext, useContext, useEffect, useState } from 'react'
import authAPi from '../lib/authAxios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) { setLoading(false); return;};
        authAPi.get('/user').then(res => setUser(res.data))
            .catch(() => localStorage.removeItem('token'))
            .finally(() => setLoading(false));
    }, []);

    async function login(email, password) {
        const { data } = await authAPi.post('/login', { email, password });
        localStorage.setItem('token', data.token);
        setUser(data.user);
    };

    async function registeration(name, email, password, password_confirmation, terms) {
        const { data } = await authAPi.post('/register', { name, email, password, password_confirmation, terms});
        localStorage.setItem('token', data.token);
        setUser(data.user);
    }

    async function logout() {
        await authAPi.post('/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
        setUser(null);
        toast.success("Successfully logut");
    }

    const { data : profile = {}} = useQuery({
        queryKey: ['profiles'],
        queryFn: () => authAPi.get('/profile').then(response => response.data.data),
        enabled: !!user,
    });

    const { data : address = [] } = useQuery({
        queryKey: ['addresses'],
        queryFn: () => authAPi.get('/address').then(response => response.data.data),
        enabled: !!user,
    });

    const { data: defaultAddress = {}} = useQuery({
        queryKey: ['addresses', 'default'],
        queryFn: () => authAPi.get('/address/default').then(response => response.data.data),
        enabled: !!user,
    });

    const { data: wishlist = {} } = useQuery({
        queryKey: ['wishlist'],
        queryFn: () => authAPi.get('/wishlist').then(response => response.data.data),
        enabled: !!user,
    });

    const queryClient = useQueryClient();

    const mutateWishlist = useMutation({
        mutationFn: ({ formdata }) => authAPi.post('/wishlist/create', formdata),
        onSuccess: (response) => {
          toast.success(response.data.message);
          queryClient.invalidateQueries({ queryKey: ['wishlist']});
        },
        onError: () => {
          toast.error("Something went wrong.");
        },
      });

    return (
        <AuthContext.Provider value={{ user, loading, login, registeration, logout, profile, address, defaultAddress, wishlist, mutateWishlist }}>
            { children }
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);