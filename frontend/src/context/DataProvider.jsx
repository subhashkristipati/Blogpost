import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [account, setAccount] = useState({ username: '', email: '' });

    const setAccountfun = (data) => {
        setAccount(data);
        // console.log(data);
    }

    const getUser = async () => {
        const token = sessionStorage.getItem('accessToken');
        const response = await api.post('/user/getUser', { token })
        setAccount(response.data)
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <DataContext.Provider value={{ account, setAccountfun }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;