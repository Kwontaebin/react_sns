import '../css/comment_list..css';

export default function Comment_list(props) {
    const { user_name, user_icon, comment, date } = props;

    return(
        <div id='comment_list'>
            <div id='comment_list_left'>
                <div id='comment_list_user_icon'>
                    <img alt='' src={`${user_icon}`} id='user_icon'></img>
                </div>

                <p id='comment_user_name'>{user_name}</p>
            </div>

            <div id='comment_list_right'>
                <div id='comment_list_right_comment_div'>
                    <p id='comment_list_right_comment'>{comment}</p>
                </div>

                <p id='comment_list_right_date'>{date}</p>
            </div>
        </div>
    )
}