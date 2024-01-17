import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CirclesWithBar } from 'react-loader-spinner'

import api from '../api/api';
import { DataContext } from '../context/DataProvider';

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    createdDate: new Date(),
};

const CreatePost = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);
    const [isloading, setLoading] = useState(false);
    // console.log(account);

    const url =
        post.picture ||
        'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const uploadImageToCloudinary = async () => {
        if (file) {
            setLoading(true);
            const data = new FormData();
            data.append('file', file);
            data.append('upload_preset', 'oneshotimage');

            try {
                let cloudName = "ddvwfbicl";
                let resourceType = 'image';
                let cloudapi = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

                const res = await axios.post(cloudapi, data);
                console.log(res);
                const { secure_url } = res.data;
                console.log(secure_url);
                savePost({ ...post, picture: secure_url });
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
    };

    const savePost = async (post) => {
        console.log(post);
        try {
            await Promise.all([api.post('/blog/create', { ...post, username: account.username })]);
            navigate('/');
        } catch (error) {
            console.error('Error saving post in cloudinary or username:', error);
            setLoading(false);
        }
    };



    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <div className="m-5 mx-auto max-w-xl">
            <img src={url} alt="post" className="w-full h-96 object-cover mb-1" />

            <div className="mx-w-md mx-auto">
                <label htmlFor="fileInput" className="block text-sm font-medium text-gray-900 dark:text-gray cursor-pointer">
                    Upload Image
                </label>
                <input
                    type="file"
                    id="fileInput"
                    className="mb-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <div className="mb-1">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-gray">
                        Title
                    </label>
                    <input
                        onChange={(e) => handleChange(e)}
                        name="title"
                        id="title"
                        type="text"
                        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter the title"
                    />
                </div>

                <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-gray">
                    Description
                </label>
                <textarea
                    id="message"
                    rows="4"
                    name="description"
                    onChange={(e) => handleChange(e)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tell your story...."
                ></textarea>

                <button
                    onClick={() => uploadImageToCloudinary()}
                    className="mt-4 p-2 text-white bg-blue-500 rounded block w-full"
                    disabled={isloading}
                >
                    Publish
                </button>

                {isloading && (
                    <div className="flex items-center justify-center flex-col mt-4">
                        <p className="text-xl font-semibold mb-4">Adding your blog...</p>
                        <div className="relative">
                            {/* CirclesWithBar component */}
                            <CirclesWithBar
                                height="100"
                                width="100"
                                color="#3072d4"
                                outerCircleColor="#3072d4"
                                innerCircleColor="#3072d4"
                                barColor="#3072d4"
                                ariaLabel="circles-with-bar-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                            {/* Loader text */}
                            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-600">
                                Wait for a moment
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreatePost;
