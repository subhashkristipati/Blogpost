import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import api from '../api/api';

import { DataContext } from '../context/DataProvider';

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
        <>
            <div className="m-10 sm:m-0 sm:p-4">
                <div className="blog-card">
                    <div className="blog-card__img">
                        <img className="block-card__img" src={post.picture || url} alt="post" />
                    </div>
                    <div className="blog-card__content">
                        <div className="float-right">
                            {account.username === post.username && (
                                <>
                                    <Link to={`/update/${id}`}>
                                        <button className="blog-card__button">Edit</button>
                                    </Link>
                                    <button className="blog-card__button" onClick={deleteBlog}>Delete</button>
                                </>
                            )}
                        </div>
                        <h1 className="blog-card__title text-center">{post.title}</h1>
                        <div className="flex items-center justify-between text-gray-500 mt-4">
                            <Link to={`/?username=${post.username}`} className="text-decoration-none">
                                <p className="font-semibold">Author: {post.username}</p>
                            </Link>
                            <p className='blog-card__code'>{new Date(post.createdDate).toDateString()}</p>
                        </div>
                        <p className="blog-card__text">{post.description}</p>
                        <p className='blog-card__text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum dapibus erat, et commodo est ultricies et.
                            Curabitur viverra elementum odio vel molestie. Mauris efficitur in sapien at posuere. Donec a pellentesque libero,
                            eu pretium tellus. Nam sodales mi vel dolor accumsan, in suscipit risus elementum. Sed quis tellus velit.
                            Aliquam bibendum, turpis sit amet volutpat tempus, purus nibh cursus lacus, vel hendrerit magna ipsum et lorem.
                            Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec sit amet magna lacus.
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Details;
