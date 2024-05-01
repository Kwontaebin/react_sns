import '../css/main.css';
import Header from '../../header/js/header';
import Write_logo_img from '../../images/write_logo.png';
import { useState, useEffect } from 'react';
import AllWriteList from './all_writeList';
import FriendPostList from './friend_postList';
import axios from 'axios';
import cookie from 'react-cookies';

export default function Main() {
    const friend_post_list = [];
    const [all_write_list, set_all_write_list] = useState([]);
    const [my_friend_post_list, set_my_friend_post_list] = useState([]);

    useEffect(() => {
        get_all_write();
        get_friend_post();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const go_write=()=> {
        window.location.href='/write';
    }

    const get_all_write=async()=> {
        const {
            data
        } = await axios.get('/get_write_list');
        set_all_write_list(data);
    }

    const get_friend_post=async()=> {
        const user_id = cookie.load('id'); // 나의 아이디

        const {
            data
        } = await axios.get(`/get_friend/${user_id}`);

        for(let i = 0; i < data.length; i++) {
            const friend_result = await axios.get(`/get_friend_post/${data[i].follow_user}`);

            for(let j = 0; j < friend_result.data.length; j++) {
                friend_post_list.push(friend_result.data[j]);
            }
        }
        const my_result = await axios.get(`/get_friend_post/${user_id}`);

        for(let k = 0; k < my_result.data.length; k++) {
            friend_post_list.push(my_result.data[k]);
        }
        set_my_friend_post_list(friend_post_list);
        // set_all_write_list(friend_post_list);
    }

    const all_write_list_result = all_write_list.map(
        (data, index) => (
            <AllWriteList
            key={index}
            id={data.id}
            user_id={data.user_id}
            user_name={data.user_name}
            user_icon={data.user_icon}
            content={data.content}
            img={data.img}
            date={data.date}
            like_img={data.like_img}
            like_count={data.like_count}
            all_write_list={all_write_list}
            data_list={data}
            ></AllWriteList>
        )
    )

    const friend_post_list_result = my_friend_post_list.map(
        (data, index) => (
            <FriendPostList
            key={index}
            id={data.id}
            user_id={data.user_id}
            user_name={data.user_name}
            user_icon={data.user_icon}
            content={data.content}
            img={data.img}
            date={data.date}
            like_img={data.like_img}
            like_count={data.like_count}
            my_friend_post_list={my_friend_post_list}
            data_list={data}
            ></FriendPostList>
        )
    )

    return(
        <div id='main'>
            <Header></Header>

            <div id='main_center'>
                {/* 모든 게시물 가져오기 */}
                <div id='view_all_write_list'>
                    {all_write_list_result}
                </div>

                {/* 나와 내 친구 게시물만 가져오기 */}
                <div id='view_friend_write_list'>
                    {friend_post_list_result}
                </div>

                <img onClick={go_write} alt="" src={Write_logo_img} id='write_logo_img'></img>
            </div>
        </div>
    )
}