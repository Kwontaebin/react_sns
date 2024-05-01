import '../css/update_post.css';
import Header from '../../header/js/header';
import queryString from 'query-string';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UpdatePostList from './update_post_list';

export default function Update_post() {
    const [post, set_post] = useState([]);

    useEffect(() => {
        const search = window.location.search
        const query = queryString.parse(search);
        
        get_post(query.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_post=async(id)=> {
        const {
            data
        } = await axios.get(`/get_post/${id}`);
        // console.log(data);
        set_post(data);
    }

    const post_result = post.map(
        (data, index) => (
            <UpdatePostList
            key={index}
            id={data.id}
            img={data.img}
            content={data.content}
            data={data}
            ></UpdatePostList>
        )
    )

    return(
        <div id='update_post_div'>
            <Header></Header>

            <div id='update_post_div_inner'>
                {post_result}
            </div>
        </div>
    )
}