import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';
import { DataContext } from '../context/DataProvider';

const loginInitialValues = {
    email: '',
    password: '',
};

const signupInitialValues = {
    username: '',
    email: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');
    const { setAccountfun } = useContext(DataContext)

    const navigate = useNavigate();

    useEffect(() => {
        showError('');
    }, [login]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        try {
            const response = await api.post('/user/login', login);
            if (response.isSuccess) {
                showError('');

                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                // console.log(response.data);
                setAccountfun({ username: response.data.name, email: response.data.email })

                isUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate('/');
            } else {
                showError('Something went wrong! Please try again later');
            }
        } catch (error) {
            console.error('Error during login:', error);
            showError('Something went wrong! Please try again later');
        }
    };

    const signupUser = async () => {
        try {
            const response = await api.post('/user/signup', signup);
            if (response.isSuccess) {
                showError('');
                // console.log(response.data);
                setAccountfun({ username: response.data.name, email: response.data.email })
                setSignup(signupInitialValues);
                toggleAccount('login');
                navigate('/')
            } else {
                showError('Something went wrong! Please try again later');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            showError('Something went wrong! Please try again later');
        }
    };

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black bg-opacity-50">
            {account === 'login' ? (
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="mb-4 text-xl font-bold">
                        <img
                            src="https://img.freepik.com/free-photo/chat-messages-right-side-white-background_187299-40138.jpg?w=740&t=st=1705307464~exp=1705308064~hmac=5d5d875f6e7792122d13443b4ae6a52a8a6f8bf6d02b403dd106bb134f11db8a"
                            alt="Blog Logo"
                            className="mr-2 inline-block w-12"
                        />
                        BlogZ
                    </div>
                    <h5 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Login to our platform</h5>
                    <div className='mb-5'>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" value={login.email}
                            onChange={(e) => onValueChange(e)}
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@gmail.com" required />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password"
                            value={login.password}
                            onChange={(e) => onValueChange(e)}
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

                    <button onClick={() => loginUser()} className="mb-3 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Login
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <button onClick={() => toggleSignup()} className="text-blue-700 hover:underline dark:text-blue-500">Create account</button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="mb-4 text-xl font-bold">
                        <img
                            src="https://img.freepik.com/free-photo/chat-messages-right-side-white-background_187299-40138.jpg?w=740&t=st=1705307464~exp=1705308064~hmac=5d5d875f6e7792122d13443b4ae6a52a8a6f8bf6d02b403dd106bb134f11db8a"
                            alt="Blog Logo"
                            className="mr-2 inline-block w-12"
                        />
                        BlogZ
                    </div>
                    <h5 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign up to our platform</h5>
                    <div className='mb-5'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input type="username" value={signup.username}
                            onChange={(e) => onInputChange(e)}
                            name="username"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name" required />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" value={signup.email}
                            onChange={(e) => onInputChange(e)}
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@gmail.com" required />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password"
                            onChange={(e) => onInputChange(e)}
                            value={signup.password}
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>

                    <button onClick={() => signupUser()} className="mb-5 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Signup
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have an account? <button onClick={() => toggleSignup()} className="text-blue-700 hover:underline dark:text-blue-500">Login</button>
                    </div>
                </div>
            )}
        </div >
    );
};

export default Login;




