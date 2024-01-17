import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// const svg1 = (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={1.5}
//         stroke="currentColor"
//         className="w-6 h-6 inline-block align-text-bottom"
//     >
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//     </svg>
// );


const Navbar = () => {
    const navigate = useNavigate();

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
                    <Link to='/account' onClick={logout} className="nav-link">LOGOUT</Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
