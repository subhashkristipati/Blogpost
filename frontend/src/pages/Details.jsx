import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import api from '../api/api';

import { DataContext } from '../context/DataProvider';


const Container = ({ children }) => (
    <div className="m-10 sm:m-0 sm:p-4">{children}</div>
);

const Image = ({ src, alt }) => (
    <img className="w-full h-96 object-cover" src={src} alt={alt} />
);

const EditIcon = ({ onClick }) => (
    <button
        onClick={onClick}
        className="m-2 p-2 border border-gray-300 rounded-full hover:bg-gray-100"
    >
        Edit
    </button>
);

const DeleteIcon = ({ onClick }) => (
    <button
        onClick={onClick}
        className="m-2 p-2 border border-gray-300 rounded-full hover:bg-gray-100"
    >
        Delete
    </button>
);

const Heading = ({ children }) => (
    <h1 className="text-4xl font-bold text-center my-6">{children}</h1>
);

const Author = ({ username, createdDate }) => (
    <div className="flex items-center justify-between text-gray-500 mt-4">
        <Link to={`/?username=${username}`} className="text-decoration-none">
            <p className="font-semibold">Author: {username}</p>
        </Link>
        <p>{new Date(createdDate).toDateString()}</p>
    </div>
);

const Details = () => {
    const url =
        'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get(`/blog/post/${id}`, { id });
            console.log(response + " -> " + id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        };
        fetchData();
    }, [id]);

    const deleteBlog = async () => {
        try {
            const response = await api.delete(`/blog/delete/${id}`);
            console.log(id + "- delete id");
            console.log(response);
            if (response.isSuccess) {
                navigate('/');
            } else {
                console.error('Error deleting post:', response.msg);
            }
        } catch (error) {
            console.error('Error in deleteBlog:', error);
        }
    };


    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <div className="float-right">
                {account.username === post.username && (
                    <>
                        <Link to={`/update/${id}`}>
                            <EditIcon />
                        </Link>
                        <DeleteIcon onClick={deleteBlog} />
                    </>
                )}
            </div>
            <Heading>{post.title}</Heading>

            <Author username={post.username} createdDate={post.createdDate} />

            <p className="mt-4">{post.description}</p>
            <p className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum dapibus erat, et commodo est ultricies et. Curabitur viverra elementum odio vel molestie. Mauris efficitur in sapien at posuere. Donec a pellentesque libero, eu pretium tellus. Nam sodales mi vel dolor accumsan, in suscipit risus elementum. Sed quis tellus velit. Aliquam bibendum, turpis sit amet volutpat tempus, purus nibh cursus lacus, vel hendrerit magna ipsum et lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec sit amet magna lacus.</p>
            {/* <Comments post={post} /> */}
        </Container>
    );
};

export default Details;
