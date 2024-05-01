import '../css/view_detail_content.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import $ from 'jquery';

export default function View_detail_content(props) {
    const { id, user_name, content, like_img } = props;
    const [post_like_list, set_post_like_list] = useState([]);

    useEffect(() => {
        get_like(); // 좋아요 목록
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_like=async()=> {
        const user_id = cookie.load('id');

        const {
            data
        } = await axios.get(`/view_detail_get_like_post/${id}/${user_id}`);
        set_post_like_list(data);

        if(data.length !== 0) {
            $("#view_detail_content_main #view_detail_content_main_footer img").attr('src', data[0].like_img);
        }
    }

    const click_like_img=async()=> {
        const user_id = cookie.load('id');

        if(post_like_list.length !== 0) {
            if(window.confirm('좋아요 취소 하시겠습니까?')) {
                const delete_result = await axios.delete(`/cancel_post_like/${id}/${user_id}`);
                console.log(delete_result);

                alert('좋아요 취소');
                window.location.reload();
            } else {
                alert('취소');
            }
        } else {
            if(window.confirm('좋아요 누르시겠습니까?')) {
                const post_like_obj = { post_id:id, user_id:user_id, like_img:'/images/red_heart.png'};
                const post_result = await axios.post('/post_like', post_like_obj);
                console.log(post_result);

                alert('좋아요');
                window.location.reload();
            } else {
                alert(' 취소');
            }
        }
    }

    return(
        <div id='view_detail_content'>
            <div id='view_detail_content_main'>
                <div id='view_detail_content_main_header'>
                    <p id='view_detail_content_main_header_name'>{user_name}</p>
                </div>

                <div id='view_detail_content_main_center'>
                    <p id='view_detail_content_main_center_content'>{content}</p>
                </div>

                <div id='view_detail_content_main_footer'>
                    <img alt='' src={`${like_img}`} onClick={click_like_img}></img>
                </div>
            </div>
        </div>
    )
}