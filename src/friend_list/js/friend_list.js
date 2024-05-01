import '../css/friend_list.css';
import No_img from '../../images/no.png';
import cookie from 'react-cookies';
import axios from 'axios';

export default function Friend_list(props) {
    const { user_name, user_icon, id } = props;

    const cancel_follow=async()=> {
        // id = 친구
        // user_id = 나
        const user_id = cookie.load('id');

        if(window.confirm('팔로우 취소하시겠습니까?')) {
            const result = await axios.delete(`/cancel_follow/${id}/${user_id}`);
            console.log(result);
            alert('팔로우 취소')
            window.location.reload();
        } else {
            alert('취소');
        }
    }

    return(
        <div id='friend_list_div'>
            <div id='friend_list_div_inner'>
                <div id='friend_list_div_user_icon_div'>
                    <img alt='' src={`${user_icon}`}></img>
                </div>
                <p>{user_name}</p>

                <img alt='' src={No_img} onClick={cancel_follow}></img>
            </div>
        </div>
    )
}