import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './home/js/login';
import Sign from './home/js/sign';
import Main from './main/js/main';
import Write from './write/js/write';
import Friend from './friend_list/js/friend';
import Search from './search/js/search';
import ViewDetail from './view_detail/js/view_detail';
import Infromation from './my_information/js/information';
import MyPost from './my_post/js/my_post';
import UpdatePost from './update/js/update_post';

export default function App() {
  return(
    <div id="app">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/sign' element={<Sign/>}></Route>
            <Route path='/main' element={<Main/>}></Route>
            <Route path='/write' element={<Write/>}></Route>
            <Route path='/view_detail' element={<ViewDetail/>}></Route>
            <Route path='/friend_list' element={<Friend/>}></Route>
            <Route path='/post_search' element={<Search/>}></Route>
            <Route path='/my_information' element={<Infromation/>}></Route>
            <Route path='/my_post' element={<MyPost/>}></Route>
            <Route path='/update_post' element={<UpdatePost/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}