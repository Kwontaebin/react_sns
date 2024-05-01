import '../css/information.css';
import Header from '../../header/js/header';
import { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import InfromationCenter from './information_center';

export default function Infromation() {
    const [user, set_user] = useState([]);

    useEffect(() => {
        get_user();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const get_user=async()=> {
        const user_id = cookie.load('id'); // 나의 아이디

        const {
            data
        } = await axios.get(`/get_user/${user_id}`);
        console.log(data);
        set_user(data);
    }

    const result = user.map(
        (data, index) => (
            <InfromationCenter
            key={index}
            id={data.id}
            user_icon={data.user_icon}
            user_id={data.user_id}
            user_name={data.user_name}
            data={data}
            ></InfromationCenter>
        )
    )

    return(
        <div id='information_div'>
            <Header></Header>

            <div id='information_div_center'>
                {result}
            </div>
        </div>
    )
}