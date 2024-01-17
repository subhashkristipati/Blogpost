import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import api from '../api/api';
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/blog/posts');
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

    return (
        <>
            {posts?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {posts.map((post) => (
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
        </>
    );
};

export default Posts;
