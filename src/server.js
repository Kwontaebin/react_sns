const express = require('express');
const body_parser = require('body-parser');
const multer = require('multer');
const upload = require('./fileUploadAction');//업로드 기능을 가져옴
const PORT = process.env.PORT || 4000;
const app = express();
app.use(body_parser.json())
const db = require('./config/db');
const multi_db = require('./config/multi_db');
app.use(body_parser.urlencoded({extended:true}));
app.use(express.json());
app.use('/images', express.static("images"));
app.use("/upload", express.static("upload"));

// 유저 목록
app.get('/user_list', (req, res) => {
    db.query('select * from user', (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 해당하는 유저만 가져오기
app.get('/get_user/:id', (req, res) => {
    const id = req.params.id;

    db.query(`select * from user where id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 회원가입
app.post('/sign', (req, res) => {
    const { user_id, user_pw, user_name, user_icon } = req.body;

    db.query(`insert into user(user_id, user_pw, user_name, user_icon) values("${user_id}", "${user_pw}",  "${user_name}",  "${user_icon}")`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 로그인
app.get(`/login/:user_id`, (req, res) => {
    const user_id = req.params.user_id;

    db.query(`select * from user where user_id="${user_id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 이미지를 upload 폴더에 넣는 쿼리
app.post('/api/upload', (req, res, next) => {
    console.log('/api/upload');
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
          return next(err);
        } else if (err) {
          return next(err);
        }
        console.log('원본파일명 : ' + req.file.originalname)
        console.log('저장파일명 : ' + req.file.filename) // 이것만 찾으면 된다.
        console.log('크기 : ' + req.file.size)
        return res.json({file:req.file.filename});
      });
})

// 글작성
app.post('/write', (req, res) => {
    const { user_id, user_name, user_icon, content, img, like_img } = req.body;

    db.query(`insert into write_list(user_id, user_name, user_icon, content, img, date, like_img, like_count) values("${user_id}", "${user_name}", "${user_icon}", "${content}", "${img}", now(), "${like_img}", 0)`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    }) 
})

// 내 정보 수정
app.put('/update_information', (req, res) => {
    const { id, user_icon, user_name } = req.body;

    const query1 = `update user set user_icon="${user_icon}", user_name="${user_name}" where id="${id}";`;
    const query3 = `update write_list set user_icon="${user_icon}", user_name="${user_name}" where user_id="${id}";`;
    const query4 = `update comment set user_name="${user_name}", user_icon="${user_icon}"  where user_id="${id}";`;

    multi_db.query(query1 + query3 + query4, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
});

// 모든 글목록 가져오기
app.get('/get_write_list', (req, res) => {
    db.query('select * from write_list', (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 내가 작성한 글 가져오기
app.get('/get_my_write_list/:id', (req,res) => {
    const { id } = req.params;

    db.query(`select * from write_list where user_id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 해당 게시물 정보 가져오기
app.get('/get_post/:id', (req, res) => {
    const { id } = req.params;

    db.query(`select * from write_list where id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 게시물을 작성한 사용자를 이용하서 게시물 가져오기
app.get('/get_friend_post/:user_id', (req, res) => {
    const { user_id } = req.params;

    db.query(`select * from write_list where user_id="${user_id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 게시물 수정하기
app.put('/update_post', (req, res) => {
    const {id, img, content} = req.body;
    // const query1 = `update user set user_icon="${user_icon}", user_name="${user_name}" where id="${id}";`;

    db.query(`update write_list set img="${img}", content="${content}" where id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 게시물 삭제하기
app.delete('/delete_post/:id', (req, res) => {
    const { id } = req.params;

    let query1 = `delete from write_list where id="${id}";`;
    let query2 = `delete from comment where post_id="${id}";`;
    let query3 = `delete from post_like where post_id="${id}";`;

    multi_db.query(query1 + query2 + query3, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 댓글 작성하기
app.post('/write_comment', (req, res) => {
    const { post_id, user_id, user_name, user_icon, comment } = req.body;

    db.query(`insert into comment(post_id, user_id, user_name, user_icon, comment, date) values("${post_id}", "${user_id}", "${user_name}", "${user_icon}", "${comment}", now())`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 해당 게시물의 댓글 가져오기
app.get('/get_comment/:post_id', (req, res) => {
    const { post_id } = req.params;

    db.query(`select * from comment where post_id="${post_id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 게시물 좋아요
app.post('/post_like', (req, res) => {
    const { post_id, user_id, like_img } = req.body;

    db.query(`insert into post_like(post_id, user_id, like_img) values("${post_id}", "${user_id}", "${like_img}")`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 해당 유저가 좋아요를 누른 게시물
app.get('/get_like_post/:id', (req, res) => {
    const { id } = req.params;

    db.query(`select * from post_like where user_id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 해당유저가 좋아요 누른 게시물 정보 가져오기.
app.get('/get_like_postList/:id', (req, res) => {
    const { id } = req.params;

    db.query(`select * from write_list where id="${id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
});

// 상세보기 에서 좋아요 가져오기
app.get('/view_detail_get_like_post/:post_id/:user_id', (req, res) => {
    const { post_id, user_id } = req.params;

    db.query(`select * from post_like where post_id="${post_id}" and user_id="${user_id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 좋아요 취소
app.delete(`/cancel_post_like/:post_id/:user_id`, (req, res) => {
    const { post_id, user_id } = req.params;

    db.query(`delete from post_like where post_id="${post_id}" and user_id="${user_id}"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 팔로우 하기
app.post('/request_follow', (req, res) => {
    const { follow_user, user_id, status } = req.body;
    const query1 = `insert into follow(follow_user, user_id, status) values("${follow_user}", "${user_id}", "${status}");`
    const query2 = `update follow set status="ok" where follow_user="${user_id}" and user_id="${follow_user}";`
    const query3 = `update follow set status="ok" where follow_user="${follow_user}" and user_id="${user_id}";`

    multi_db.query( query1 + query2 + query3, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 모든 팔로우 목록 가져오기
app.get('/follow_list', (req, res) => {
    db.query('select * from follow', (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 친구 목록 가져오기
app.get('/get_friend/:user_id', (req, res) => {
    const { user_id } = req.params;
    const query1 = `select * from follow where user_id="${user_id}" and status="ok"`

    db.query(query1, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 나를 팔로우한 유저 목록가져오기
app.get('/get_request_friend/:user_id', (req, res) => {
    const { user_id } = req.params;

    db.query(`select * from follow where follow_user="${user_id}" and status="no"`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 팔로우 취소
app.delete(`/cancel_follow/:follow_user/:user_id`, (req, res) => {
    const { follow_user, user_id } = req.params;
    
    const query1 = `delete from follow where follow_user="${follow_user}" and user_id="${user_id}";`;
    const query2 = `update follow set status="no" where follow_user="${user_id}" and user_id="${follow_user}";`

    multi_db.query(query1 + query2, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// 특정 게시물 검색
app.get('/search_post/:value', (req, res) => {
    const { value } = req.params;

    db.query(`select * from write_list where content like '%${value}%'`, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

app.listen(PORT, () => {
    console.log(`server on http://localhost:${PORT}`);
})