import React, { useEffect, useState, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import api from '../api/api';
import Post from '../components/Post';
import { DataContext } from '../context/DataProvider';

const Myposts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const { account } = useContext(DataContext);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/blog/posts/');
                if (response.isSuccess) {
                    setPosts(response.data);
                } else {
                    console.error(response.msg);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, [searchParams]);

    useEffect(() => {
        const filtered = posts.filter(post => post.username === account.username);
        setFilteredPosts(filtered);
    }, [posts, account.username]);

    return (
        <>
            <div className='mt-10 ml-4 md:ml-[100px] flex w-5/6 p-4'>
                {posts?.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredPosts.map((post) => (
                            <div key={post._id}>
                                <Link to={`details/${post._id}`} className="no-underline text-black">
                                    <Post post={post} />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-700 m-8 text-2xl">No data is available</div>
                )}
            </div>
        </>

    );
};

export default Myposts;
