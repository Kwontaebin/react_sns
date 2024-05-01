import '../css/friend_postList.css';
import Comment_view from '../../images/comment_view.png';
import Comment from '../../images/comment.png';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import CommentList from './comment_list';

export default function Friend_postList(props) {
    const { id, user_name, user_icon, content, img, date, like_img, user_id } = props;
    const [comment_idx, set_comment_idx] = useState();
    const [write_comment_input_value, set_write_comment_input_value] = useState();
    const [user, set_user] = useState([]);
    const [post_comment_list, set_post_comment_list] = useState([]);
    const [all_follow_list, set_all_follow_list] = useState([]);
    // const [user_post_like, set_user_post_like] = useState([]);
    // const like_array = [];

    useEffect(() => {
        get_user_information();
        get_comment();
        change_heart_img();
        get_follow();

        $("#all_write_list_div_footer_top #view_comment").click(function() {
            let idx = $("#all_write_list_div_footer_top #view_comment").index(this);
            set_comment_idx(idx);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_user_information=async()=> {
        const id = cookie.load('id');

        const {
            data
        } = await axios.get(`/get_user/${id}`);
        set_user(data);
    }

    const get_comment=async()=> {
        const {
            data
        } = await axios.get(`/get_comment/${id}`);
        set_post_comment_list(data);
    }

    const get_follow=async()=> {
        const {
            data
        } = await axios.get('/follow_list');
        set_all_follow_list(data);
    }

    const change_heart_img=async()=> {
        const user_id = cookie.load('id');

        const {
            data
        } = await axios.get(`/get_like_post/${user_id}`);
        // console.log(data);

        for(let i = 0; i < data.length; i++) {
            
        }
    }

    const view_comment=()=> {
        if($("#all_write_list_div_footer_top #view_comment").eq(comment_idx).hasClass('comment') === true) {
            $("#all_write_list_div_footer_top #view_comment").eq(comment_idx).removeClass('comment');
            $("#all_write_list_div_footer_top #view_comment").eq(comment_idx).attr('src', Comment_view);
            $("#all_write_list_div_footer_top #write_user_name").eq(comment_idx).hide();
            $("#all_write_list_div_footer_top #write_date").eq(comment_idx).hide();
            $("#all_write_list_div_footer_top #comment_length_text").eq(comment_idx).show();
            $("#all_write_list_div_footer_top #comment_length_text").eq(comment_idx).text(`${post_comment_list.length} 개의 댓글이 있습니다.`);
            $("#all_write_list_div_footer_top #write_user_icon_div").eq(comment_idx).hide();
            $("#all_write_list_div_footer #write_content_div").eq(comment_idx).hide();
            $("#all_write_list_div_footer #comment_list_div").eq(comment_idx).show();
        } else {
            $("#all_write_list_div_footer_top #view_comment").eq(comment_idx).addClass('comment');
            $("#all_write_list_div_footer_top #view_comment").eq(comment_idx).attr('src', Comment);
            $("#all_write_list_div_footer_top #write_user_name").eq(comment_idx).show();
            $("#all_write_list_div_footer_top #write_date").eq(comment_idx).show();
            $("#all_write_list_div_footer_top #comment_length_text").eq(comment_idx).hide();
            $("#all_write_list_div_footer_top #write_user_icon_div").eq(comment_idx).show();
            $("#all_write_list_div_footer #comment_list_div").eq(comment_idx).hide();
            $("#all_write_list_div_footer #write_content_div").eq(comment_idx).show();
        }
    }

    const get_comment_value=(e)=> {
        set_write_comment_input_value(e.target.value);
    }

    const post_like_btn=async()=> {
        const user_id = cookie.load('id');
        const post_like_obj = { post_id:id, user_id:user_id, like_img:`/images/red_heart.png` }

        const result = await axios.post('/post_like', post_like_obj);
        console.log(result);
        alert('좋아요!')
    }

    const write_comment_btn=async()=> {
        const write_comment_obj = { post_id:id, user_id:user[0].id, user_name:user[0].user_name, user_icon:user[0].user_icon, comment:write_comment_input_value };
        const result = await axios.post('/write_comment', write_comment_obj);
        console.log(result);

        alert('작성완료')
    }

    const write_comment_enter=(e)=> {
        if(e.key === 'Enter') {
            write_comment_btn();
            return;
        }
    }

    const request_follow=async()=> {
        console.log(user_id); // 팔로우 하는 유저의 아이디
        const id = cookie.load('id') // 나의 아이디
        console.log(all_follow_list);

        for(let i = 0; i < all_follow_list.length; i++) {
            if(Number(user_id) === all_follow_list[i].follow_user && Number(id) === all_follow_list[i].user_id) {
                if(window.confirm("팔로우 취소하시겠습니까?")) {
                    // const cancel_follow_obj = {follow_user:user_id, user_id:id};
                    const result = await axios.delete(`/cancel_follow/${user_id}/${id}`);
                    console.log(result);
                    window.location.reload();
                    return;
                } else {
                    alert('n')
                    return;
                }
            }
        }

        if(window.confirm("팔로우 하시겠습니까?")) {
            if(user_id === id) {
                alert('본인을 팔로우 할수없습니다.');
                return;
            } else {
                const request_follow_obj = { follow_user:user_id, user_id:id, status:"no" };
                const result = await axios.post('/request_follow', request_follow_obj);
                console.log(result);
                alert('팔로우 성공!');
                window.location.reload();
                return;
            }
        } else {
            alert('취소');
            return;
        }
    }

    const view_detail_post=async()=> {
        window.location.href=`/view_detail?id=${id}&ie=utf-8`;
    }

    const comment_result = post_comment_list.map(
        (data, index) => (
            <CommentList
            key={index}
            id={data.id}
            post_id={data.post_id}
            user_name={data.user_name}
            user_icon={data.user_icon}
            comment={data.comment}
            date={data.date}
            ></CommentList>
        )
    )

    return(
        <div id='friend_post_list_div'>
            <div id='all_write_list_div' className={id}>
                <div id='all_write_list_div_header'>
                    <img alt='' src={`${img}`} id='write_img' onClick={view_detail_post}></img>
                </div>

                <div id='all_write_list_div_footer'>
                    <div id='all_write_list_div_footer_top'>
                        <div id='write_user_icon_div'>
                            <img onClick={request_follow} alt='' src={`${user_icon}`} id='write_user_icon'></img>
                        </div>

                        <p id='write_user_name'>{user_name}</p>

                        <p id='write_date'>{date}</p>

                        <p id='comment_length_text'></p>

                        <img alt='' src={`${like_img}`}  id='like_img' onClick={post_like_btn}></img>
                        <img alt='' src={Comment} className='comment' id='view_comment' onClick={view_comment}></img>
                    </div>

                    <div id='write_content_div'>
                        <p id='write_content'>{content}</p>
                    </div>

                    <div id='comment_list_div'>
                        <div id='comment_list_div_top'>
                            {/* 댓글 목록 들어올 예정 */}
                            {comment_result}
                        </div>

                        <div id='comment_list_div_bottom'>
                            <input onKeyDown={write_comment_enter} placeholder='댓글을 작성하세요...' id='write_comment_input' onChange={get_comment_value}></input>
                            <p id='write_comment_btn' onClick={write_comment_btn}>입력</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}