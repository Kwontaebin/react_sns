import '../css/search_list.css';

export default function Search_list(props) {
    const { user_icon, user_name, content, date, img, id } = props;

    const view_detail_post=async()=> {
        window.location.href=`/view_detail?id=${id}&ie=utf-8`;
    }

    return(
        <div id='search_list_div'>
            <div id='search_list_div_inner'>
                <div id='search_list_div_img'>
                    <img alt='' src={`${img}`} onClick={view_detail_post}></img>
                </div>

                <div id='search_list_div_header'>
                    <div id='search_list_div_user_icon'>
                        <img alt='' src={`${user_icon}`}></img>
                    </div>

                    <p id='search_list_div_user_name'>{user_name}</p>
                    <p id='search_list_div_date'>{date}</p>
                </div>
                
                <div id='search_list_div_center'>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
}