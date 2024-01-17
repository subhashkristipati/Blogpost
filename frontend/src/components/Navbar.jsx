import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { DataContext } from "../context/DataProvider";

const Navbar = () => {
    const navigate = useNavigate();
    const { account } = useContext(DataContext);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const url = 'https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745'

    const logout = async () => navigate('/account');

    return (
        <header className="bg-black text-white">
            <div className="flex justify-between items-center p-4">
                {/* Blog Logo */}
                <Link to='/' className="text-black text-xl font-bold">
                    <img
                        src="https://img.freepik.com/free-photo/chat-messages-right-side-white-background_187299-40138.jpg?w=740&t=st=1705307464~exp=1705308064~hmac=5d5d875f6e7792122d13443b4ae6a52a8a6f8bf6d02b403dd106bb134f11db8a"
                        alt="Blog Logo"
                        className="mr-2 inline-block w-12"
                    />
                    BlogZ
                </Link>



                {/* Navigation Links */}
                <nav className="flex space-x-4">
                    <Link to='/' className="nav-link">HOME</Link>
                    <Link to='/myposts' className="nav-link">MY POSTS</Link>
                    <Link to='/create' className="nav-link">CREATE POSTS</Link>

                    <div className="relative">
                        <button
                            type="button"
                            className="mt-1 flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            onClick={() => setDropdownVisible(!isDropdownVisible)}
                            aria-expanded={isDropdownVisible}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src={url} alt="" />
                        </button>

                        {/* User dropdown content */}
                        {isDropdownVisible && (
                            <div className="absolute right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white">{account.username}</span>
                                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{account.email}</span>
                                </div>
                                <ul className="py-2">
                                    <li>
                                        <Link to="/accout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={logout}>Sign out</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                </nav>
            </div>
        </header>
    );
};

export default Navbar;
