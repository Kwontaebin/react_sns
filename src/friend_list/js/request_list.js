import '../css/request_list.css';
import Add_follow_img from '../../images/add_follow_img.png'
import cookie from 'react-cookies';
import axios from 'axios';

export default function Request_list(props) {
    const { user_name, user_icon, id } = props;

    const follow_img=async()=> {
        // id = 친구
        // user_id = 나
        const user_id = cookie.load('id');

        if(window.confirm("팔로우 하시겠습니까?")) {
            if(user_id === id) {
                alert('본인을 팔로우 할수없습니다.');
                return;
            } else {
                const request_follow_obj = { follow_user:id, user_id:user_id, status:"no" };
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

    return(
        <div id='request_list_div'>
             <div id='request_list_div_inner'>
                <div id='request_list_div_user_icon_div'>
                    <img alt='' src={`${user_icon}`}></img>
                </div>
                <p>{user_name}</p>

                <img alt='' src={Add_follow_img} onClick={follow_img}></img>
            </div>
        </div>
    )
}