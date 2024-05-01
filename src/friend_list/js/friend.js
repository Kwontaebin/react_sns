import '../css/friend.css';
import Header from '../../header/js/header';
import $ from 'jquery';
import { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import FriendList from './friend_list';
import RequestList from './request_list';

export default function Friend() {
    const user_friend_information = [];
    const user_request_information = [];

    const [friend_page_user, set_friend_page_user] = useState([]);
    const [request_page_user, set_request_page_user] = useState([]);

    useEffect(()=> {
        get_friend_list();
        get_request_list();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_friend_list=async()=> {
        const id = cookie.load('id')

        const {
            data
        } = await axios.get(`/get_friend/${id}`);

        for(let i = 0; i < data.length; i++) {
            const result = await axios.get(`/get_user/${data[i].follow_user}`);
            user_friend_information.push(result.data[0]);
        }
        set_friend_page_user(user_friend_information);
    }

    const get_request_list=async()=> {
        const id = cookie.load('id')

        const {
            data
        } = await axios.get(`/get_request_friend/${id}`);

        for(let i = 0; i < data.length; i++) {
            const result = await axios.get(`/get_user/${data[i].user_id}`);
            user_request_information.push(result.data[0]);
        }
        set_request_page_user(user_request_information);
        // console.log(user_request_information);
    }

    const show_friend_page=()=> {
        $("#request_list_text").removeClass('current_page')
        $("#friend_list_text").addClass('current_page')

        $("#request_list_div").hide();
        $("#friend_list_div").show();
    }

    const show_request_page=()=> {
        $("#friend_list_text").removeClass('current_page')
        $("#request_list_text").addClass('current_page')

        $("#friend_list_div").hide();
        $("#request_list_div").show();
    }

    const friend_result = friend_page_user.map(
        (data, index) => (
            <FriendList
            key={index}
            id={data.id}
            user_icon={data.user_icon}
            user_name={data.user_name}
            data={data}
            ></FriendList>
        )
    )

    const request_result = request_page_user.map(
        (data, index) => (
            <RequestList
            key={index}
            id={data.id}
            user_icon={data.user_icon}
            user_name={data.user_name}
            data={data}
            ></RequestList>
        )
    )

    return(
        <div id='friend_div'>
            <Header></Header>
            
            <div id='friend_div_header'>
                <p id='friend_list_text' className='current_page' onClick={show_friend_page}>친구목록</p>
                <p id='request_list_text' onClick={show_request_page}>친구신청목록</p>
            </div>

            <div id='friend_list_div'>
                {friend_result}
            </div>

            <div id='request_list_div'>
                {request_result}
            </div>
        </div>
    )
}