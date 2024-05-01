import '../css/view_detail.css';
import Header from '../../header/js/header';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ViewDetailContent from './view_detail_content';
import ViewDetialImg from './view_detail_img';
import ViewDetailComment from './view_detail_comment';
import $ from 'jquery';
import No_img from '../../images/no.png';
import cookie from 'react-cookies';

export default function View_detail() {
    const [post_infromation, set_post_infromation] = useState([]);
    const [comment, set_comment] = useState([]);
    const [post_id, set_post_id] = useState();
    const [comment_value, set_comment_value] = useState();

    useEffect(() => {
        const search = window.location.search;
        const query = queryString.parse(search)

        get_post(query.id);
        get_comment(query.id);
        set_post_id(query.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_post=async(id)=> {
        const {
            data
        } = await axios.get(`/get_post/${id}`);
        set_post_infromation(data);
    }

    const get_comment=async(id)=> {
        const {
            data
        } = await axios.get(`/get_comment/${id}`);
        set_comment(data);

        $("#view_detail_div_footer input").attr('placeholder', `${data.length}개의 댓글이있습니다.`)
    }

    const write_post_input_btn=()=> {
        $("#view_detail_div_content").hide();
        $("#view_detail_div_comment").show();
    }

    const view_detail_div_comment_hide_btn=()=> {
        $("#view_detail_div_comment").hide();
        $("#view_detail_div_content").show();
    }

    const get_comment_value=(e)=> {
        set_comment_value(e.target.value);
    }

    const write_comment_key=async(e)=> {
        const user_icon = '/images/basic_user_icon.png';
        const user_id = cookie.load('id')
        const user_name = cookie.load('name');

        if(e.key === 'Enter') {
            const write_comment_obj = { post_id:post_id, user_id:user_id, user_name:user_name, user_icon:user_icon, comment:comment_value };
            const result = await axios.post('/write_comment', write_comment_obj);
            console.log(result)
            window.location.reload();
        }
    }

    const content_result = post_infromation.map(
        (data, index) => (
            <ViewDetailContent
            key={index}
            id={data.id}
            user_name={data.user_name}
            content={data.content}
            user_icon={data.user_icon}
            like_img={data.like_img}
            data={data}
            ></ViewDetailContent>
        )
    )

    const img_result = post_infromation.map(
        (data, index) => (
            <ViewDetialImg
            key={index}
            id={data.id}
            img={data.img}
            data={data}
            ></ViewDetialImg>
        )
    )

    const comment_result = comment.map(
        (data, index) => (
            <ViewDetailComment
            key={index}
            id={data.id}
            user_name={data.user_name}
            user_icon={data.user_icon}
            comment={data.comment}
            date={data.date}
            data={data}
            ></ViewDetailComment>
        )
    )

    return(
        <div id='view_detail_div'>
            <Header></Header>

            <div id='view_detail_div_img'>
                {img_result}
            </div>

            {/* 글, content */}
            <div id='view_detail_div_content'>
                {content_result}
            </div>

            {/* 댓글, comment */}
            <div id='view_detail_div_comment'>
                <div id='view_detail_div_comment_header'>
                    <img alt='' src={`${No_img}`} id='view_detail_div_comment_hide_btn' onClick={view_detail_div_comment_hide_btn}></img>
                </div>

                <div id='view_detail_div_comment_main'>
                    {comment_result}
                </div>
            </div>

            <div id='view_detail_div_footer'>
                <input onClick={write_post_input_btn} onChange={get_comment_value} onKeyDown={write_comment_key}></input>
            </div>
        </div>
    )
}