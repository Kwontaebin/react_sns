import '../css/header.css';
import $ from 'jquery';
import Header_home_img from '../../images/header_home.png';
import Header_list_img from '../../images/header_list.png';
import { useEffect } from 'react';

export default function Header() {
    useEffect(() => {
        $("#header_list_img").mouseenter(function() {
            $("#header_list").show();
        })

        $("#header_list").mouseleave(function() {
            $("#header_list").hide();
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const go_main=()=> {
        window.location.href='/main';
    }

    const checkbox_check=(e)=> {
        // true, false로 확인가능.
        var checked = $('#header_left_input_btn').is(':checked');

        if(checked === true) {
            $("#view_all_write_list").hide();
            $("#view_friend_write_list").show();
        } else if(checked === false) {
            $("#view_friend_write_list").hide();
            $("#view_all_write_list").show();
        }
    }

    const go_my_information=()=> {
        window.location.href='/my_information';
    }

    const go_firned_list=()=> {
        window.location.href='/friend_list';
    }

    const go_my_post=()=> {
        window.location.href='my_post';
    }

    const go_search_list=()=> {
        window.location.href='/post_search';
    }

    return(
        <div id='header'>
            <div id='header_left'>
                <img onClick={go_main} alt="" src={Header_home_img} id="header_home_img"></img>

                <label>
                    {/* checked값이 false면 모든 게시물 보기 checked값이 true면 팔로우 게시물만 보기 */}
                    <input onClick={checkbox_check} role="switch" type="checkbox" id="header_left_input_btn"/>
                </label>
            </div>

            <div id='header_center'>
                <h1 id='header_logo'>story</h1>
            </div>

            <div id='header_right'>
                {/* header_list_logo를 누르면 hover 로 목록이 나온다. 목록은 노트를 참고. */}
                <img alt="" src={Header_list_img} id="header_list_img"></img>

                <div id='header_list'>
                    <div id='header_list_div1' onClick={go_my_information}>
                        <p>내정보</p>
                    </div>

                    <div id='header_list_div2' onClick={go_firned_list}>
                        <p>친구목록</p>
                    </div>

                    <div id='header_list_div3' onClick={go_my_post}>
                        <p>나의 게시물</p>
                    </div>

                    <div id='header_list_div' onClick={go_search_list}>
                        <p>게시물 검색</p>
                    </div>
                </div>
            </div>
        </div>
    )
}