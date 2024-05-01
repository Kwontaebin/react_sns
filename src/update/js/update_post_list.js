import '../css/update_post_list.css';
import { useState } from 'react';
import axios from 'axios';

export default function Update_post_list(props) {
    const { id, img, content } = props;
    const [selectedFile, Set_selectedFile] = useState(img);
    const [post_content, set_post_content] = useState(content);
    let user_img;

    const file_input=(e)=> {
        Set_selectedFile(e.target.files[0]);
    }

    const get_content_value=(e)=> {
        set_post_content(e.target.value);
    }

    const update_post_btn=async()=> {
        const formData = new FormData();
        formData.append('file', selectedFile);

        if(selectedFile === img) {
            user_img = img
        } else {
            const {
                data
            } = await axios.post('/api/upload', formData);
            console.log(data.file);
            user_img = `/upload/${data.file}`
        }

        const update_obj = { id:id, img:user_img, content:post_content };
        const result = await axios.put('/update_post', update_obj);
        console.log(result);
    }

    const delete_post_btn=async()=> {
        if(window.confirm('해당 게시물을 삭제하시겠습니까?')) {
            const result = await axios.delete(`/delete_post/${id}`);
            console.log(result);
            alert('삭제');
            window.location.href='/my_post';
        } else {
            alert('취소');
        }
    }

    return(
        <div id='update_post_list_div'>
            <div id='update_list_div_inner'>
                <div id='update_post_list_img'>
                    <img alt='' src={`${img}`}></img>
                    <input type='file' name='file' onChange={file_input}></input>
                </div>

                <div id='update_post_list_content'>
                    <input defaultValue={content} onChange={get_content_value}></input>
                </div>

                <div id='update_post_list_footer'>
                    <button id='post_update_btn' onClick={update_post_btn}>수정하기</button>
                    <button id='post_delete_btn' onClick={delete_post_btn}>삭제하기</button>
                </div>
            </div>
        </div>
    )
}