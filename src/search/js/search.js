import '../css/search.css';
import Header from '../../header/js/header';
import { useState } from 'react';
import axios from 'axios';
import SearchList from './search_list';

export default function Search() {
    const [search_input_value, set_search_input_value] = useState();
    const [post_list, set_post_list] = useState([]);

    const get_search_input_value=(e)=> {
        set_search_input_value(e.target.value);
    }

    const search_post=async()=> {
        const {
            data
        } = await axios.get(`/search_post/${search_input_value}`);
        console.log(data);
        set_post_list(data);
    }

    const search_post_enter=(e)=> {
        if(e.key === "Enter") {
            search_post();
        }
    }

    const search_list_result = post_list.map(
        (data, index) => (
            <SearchList
            key={index}
            id={data.id}
            user_icon={data.user_icon}
            user_name={data.user_name}
            content={data.content}
            date={data.date}
            img={data.img}
            like_img={data.like_img}
            data={data}
            ></SearchList>
        )
    )

    return(
        <div id='search_div'>
            <Header></Header>

            <div id='search_div_header'>
                <input onChange={get_search_input_value} onKeyDown={search_post_enter}></input>
                <p onClick={search_post}>검색</p>
            </div>

            <div id='search_div_center'>
                {search_list_result}
            </div>
        </div>
    )
}