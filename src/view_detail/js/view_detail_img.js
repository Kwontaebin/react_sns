import '../css/view_detail_img.css';

export default function View_detial_img(props) {
    const { img } = props; 

    return(
        <div id='view_detail_img'>  
            <img alt='' src={`${img}`}></img>
        </div>
    )
}