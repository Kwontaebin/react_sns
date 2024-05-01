import '../css/login.css'
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useState, useEffect } from 'react';
import cookie from 'react-cookies';

export default function Login() {
    const [login_status, set_login_status] = useState("null");
    const [login_value, set_login_value] = useState();
    const [password_value, set_password_value] = useState();

    useEffect(() => {
        login();

        async function login() {
            if(login_status === "none_space") {
                alert('전부다 작성해주세요');
            } else if(login_status === "login_err") {
                alert('회원정보가 일치하지 않습니다.')
            } else if(login_status === "success") {
                const {
                    data
                } = await axios.get(`/login/${login_value}`);

                console.log(data);

                const expires = new Date()
                expires.setMinutes(expires.getMinutes() + 60)

                cookie.save('id', data[0].id, {
                    path : '/',
                    expires,
                });

                cookie.save('name', data[0].user_name, {
                    path : '/',
                    expires,
                });
                
                alert('로그인');

                window.location.href='/main';
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login_status]);

    const login_input_value=(e)=> {
        set_login_value(e.target.value);
    }

    const password_input_value=(e)=> {
        set_password_value(e.target.value);
    }

    const login_btn=async()=> {
        const {
            data
        } = await axios.get('/user_list');

        console.log(data);

        for(let i = 0; i < data.length; i++) {
            const bytes  = CryptoJS.AES.decrypt(data[i].user_pw, "5546")
            const decoding_pw = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            if(data[i].user_id == login_value && decoding_pw == password_value)  {
                set_login_status('success')
                return;
            } else if(login_value === undefined || password_value === undefined) {
                set_login_status('none_space')
                return;
            } else {
                set_login_status('login_err');
            } 
        }
    }

    const login_enter_btn=(e)=> {
        if(e.key === "Enter") {
            login_btn();
        }
    }

    const go_sign=()=> {
        window.location.href='/sign';
    }

    return(
        <div id='login'>
            <div id='login_header'>
                <h1 id='login_header_logo'>story</h1>
            </div>

            <div id='login_center'>
                <input id='login_input_value' onChange={login_input_value} placeholder='login'></input>
                <input type='password' id='password_input_value' onChange={password_input_value} placeholder='password' onKeyDown={login_enter_btn}></input>

                <button onClick={login_btn}>로그인</button>
                <span onClick={go_sign}>화원가입 하시겠습니까?</span>
            </div>

            <div id='login_footer'>

            </div>
        </div>
    )
}