import '../css/view_detail_comment.css'

export default function View_detail_comment(props) {
    const { user_icon, user_name, comment, date } = props;

    return(
        <div id='view_detail_comment'>
            <div id='view_detail_comment_left'>
                <div id='view_detail_comment_left_user_icon_div'>
                    <img alt='' src={`${user_icon}`}></img>
                </div>

                <p id='view_detail_comment_left_user_name'>{user_name}</p>
            </div>

            <div id='view_detail_comment_right'>
                <div id='view_detail_comment_right_comment_div'>
                    <p id='view_detail_comment_right_comment'>{comment}</p>
                </div>

                <p id='view_detail_comment_right_date'>{date}</p>
            </div>
        </div>
    )
}