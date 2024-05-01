import '../css/my_post.css';
import Header from '../../header/js/header';
import axios from 'axios';
import cookie from 'react-cookies';
import { useEffect, useState } from 'react';
import MyPostList from './my_postList';

export default function My_post() {
    const [ user_post, set_user_post ] = useState([]);

    useEffect(() => {
        get_user_post();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_user_post=async()=> {
        const id = cookie.load('id');
        
        const {
            data
        } = await axios.get(`/get_my_write_list/${id}`);
        set_user_post(data);
    }

    const post_result = user_post.map(
        (data, index) => (
            <MyPostList
            key={index}
            id={data.id}
            img={data.img}
            user_icon={data.user_icon}
            user_name={data.user_name}
            date={data.date}
            content={data.content}
            data={data}
            ></MyPostList>
        )
    )

    return(
        <div id='my_post_div'>
            <Header></Header>

            <div id='my_post_div_center'>
                {post_result}
            </div>
        </div>
    )
}