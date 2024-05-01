import '../css/my_postList.css';

export default function My_postList(props) {
    const { id, img, user_icon, user_name, date, content } = props;

    const update_post=()=> {
        window.location.href=`/update_post?id=${id}&ie=utf-8`;
    }

    return(
        <div id='my_postList_div'>
            <div id='my_postList_div_inner'>
                <div id='my_postList_div_inner_img' onClick={update_post}>
                    <img alt='' src={`${img}`}></img>
                </div>

                <div id='my_postList_div_inner_header'>
                    <div id='my_postList_div_inner_header_user_icon'>
                        <img alt='' src={`${user_icon}`}></img>
                    </div>

                    <p id='my_postList_div_inner_header_user_name'>{user_name}</p>
                    <p id='my_postList_div_inner_header_date'>{date}</p>
                </div>

                <div id='my_postList_div_inner_content'>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
}