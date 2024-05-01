import '../css/write.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

export default function Write() {
    const [selectedFile, Set_selectedFile] = useState(null);
    const [get_content, set_get_content] = useState();
    const [user, set_user] = useState([]);
    let [mainImg,setMainImg] = useState("");

    useEffect(() => {
        get_user();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_user=async()=> {
        const user_id = cookie.load('id');

        const {
            data
        } = await axios.get(`/get_user/${user_id}`);
        console.log(data)
        set_user(data);
    }

    const go_main=()=> {
        window.location.href='/main';
    }

    const file_input=(e)=> {
        Set_selectedFile(e.target.files[0]);

        var reader = new FileReader();

        reader.onload = function(e) {
            setMainImg(e.target.result);
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    const content_input_value=(e)=> {
        set_get_content(e.target.value);
    }

    const write_btn=async()=> {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const {
            data
        } = await axios.post('/api/upload', formData);
        console.log(data.file);
        
        const user_id = cookie.load('id');
        const user_name = user[0].user_name;
        const user_icon = user[0].user_icon;

        const write_obj = { user_id: user_id, user_name:user_name, user_icon:user_icon, content:get_content, img:`/upload/${data.file}`, like_img:`/images/black_heart.png` };
        const result = await axios.post('/write', write_obj);
        console.log(result);
        window.location.href='/main';
    }

    return(
        <div id='write'>
            <div id='write_header'>
                <div id='write_header_left'>
                    <button id='back_btn' onClick={go_main}>뒤로가기</button>

                </div>
                <div id='write_header_right'>
                    <h1 id='write_header_text'>글쓰기</h1>
                </div>
            </div>

            <div id='write_img'>
                <input type='file' name="file" onChange={file_input} id='file_input'></input>
                <img alt='' src={mainImg} id='img_preview'></img>
            </div>

            <div id='write_content'>
                <input id='content_input' onChange={content_input_value}></input>
                <button onClick={write_btn} id='write_btn'>작성하기</button>
            </div>
        </div>
    )
}