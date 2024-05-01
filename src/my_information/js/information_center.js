import '../css/information_center.css';
import { useState } from 'react';
import axios from 'axios';

export default function Infromation_center(props) {
    const { id, user_icon, user_id, user_name } = props;

    const [user_name_value, set_user_name_value] = useState(user_name);
    const [selectedFile, Set_selectedFile] = useState(user_icon);
    let user_icon_img;
    // const [get_content, set_get_content] = useState();

    const file_input=(e)=> {
        Set_selectedFile(e.target.files[0]);
    }

    const get_user_name_value=(e)=> {
        set_user_name_value(e.target.value);
    }

    const update_btn=async()=> {
        const formData = new FormData();
        formData.append('file', selectedFile);

        if(selectedFile === user_icon) {
            user_icon_img = user_icon
        } else {
            const {
                data
            } = await axios.post('/api/upload', formData);
            console.log(data.file);
            user_icon_img = `/upload/${data.file}`
        }

        const update_obj = { id:id, user_icon:user_icon_img, user_name:user_name_value};

        const result = await axios.put('/update_information', update_obj);
        console.log(result);

        alert('수정완료');
        window.location.reload();
    }

    return(
        <div id='information_center_div'>
            <div id='information_center_div_img'>
                <div id='information_center_div_img_user_icon_div'>
                    <img alt='' src={`${user_icon}`}></img>
                    <input type='file' name="file" onChange={file_input} placeholder='사진 변경'></input>
                </div>
            </div>

            <div id='information_center_div_center'>
                <div id='information_center_div_center_user_id_div'>
                    <p id='information_center_div_center_user_id_div_text'>아이디</p>
                    <p id='information_center_div_center_user_id_div_user_id'>{user_id}</p>
                </div>

                <div id='information_center_div_center_user_name_div'>
                    <p id='information_center_div_center_user_name_div_text'>이름</p>
                    <input defaultValue={`${user_name}`} onChange={get_user_name_value}></input>
                </div>

                <button onClick={update_btn}>수정하기</button>
            </div>
        </div>  
    )
}