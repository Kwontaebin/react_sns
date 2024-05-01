import '../css/sign.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function Sign() {
    const [login_value, set_login_value] = useState();
    const [password_value, set_password_value] = useState();
    const [name_value, set_name_value] = useState();
    const [sign_status, set_sign_status] = useState("null");

    useEffect(() => {
        sign();

        async function sign() {
            if(sign_status === "none_space") {
                alert('모두다 작성해주세요');
            } else if(sign_status === "same_login") {
                alert('이미 사용중인 아이디입니다.');
            } else if(sign_status === "same_name") {
                alert('이미 사용중인 닉네임입니다.');
            } else if(sign_status === "success") {
                const hash_pw = CryptoJS.AES.encrypt(password_value, "5546").toString();

                const sign_obj = { user_id:login_value, user_pw:hash_pw, user_name:name_value, user_icon:"/images/basic_user_icon.png" };
                const result = await axios.post('/sign', sign_obj);
                console.log(result);
                alert('회원가입 성공');
                window.location.href='/';
            } 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sign_status]);

    const sign_login_value=(e)=> {
        set_login_value(e.target.value);
    }

    const sign_password_value=(e)=> {
        set_password_value(e.target.value);
    }

    const sign_name_value=(e)=> {
        set_name_value(e.target.value);
    }

    const sign_btn=async()=> {
        const {
            data
        } = await axios.get('/user_list');

        console.log(data);

        if(data.length === 0) {
            set_sign_status('success');
        }

        for(let i = 0; i < data.length; i++) {
            if(login_value === undefined || password_value === undefined || name_value === undefined) {
                set_sign_status('none_space');
                window.location.href='/sign';
                return;
            } else if(login_value === data[i].user_id) {
                set_sign_status('same_login');
                window.location.href='/sign';
                return;
            } else if(name_value === data[i].user_name) {
                set_sign_status('same_name');
                window.location.href='/sign';
                return;
            }  else {
                set_sign_status('success');
                return;
            }
        }
    }

    return(
        <div id='sign'>
            <div id="sign_header">
                <h1 id='sign_header_logo'>story</h1>
            </div>

            <div id="sign_center">
                <input id="sign_login_value" onChange={sign_login_value} placeholder="login"></input>
                <input type='password' id="sign_password_value" onChange={sign_password_value} placeholder="password"></input>
                <input id="sign_name_value" onChange={sign_name_value} placeholder="name"></input>

                <button onClick={sign_btn} id='sign_btn'>회원가입</button>
            </div>
        </div>
    )
}