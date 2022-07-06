const poolPromise = require('../config/pool')

const controllers ={
    getAllPosts: async(req, res)=>{
        let pool = await poolPromise();
        pool.query(`SELECT * FROM posts`).then(data=>{
            if (data.recordset) {
                return res.status(200).json({
                    Status: 200,
                    Success: true,
                    Message: 'All users',
                    Result: data.recordset
                }) && console.log(data.recordset)
            }
            res.status(404).json({
                Status: 404,
                Success: false,
                Message: 'Users not found',
                result: []
            })
        })
    },

    login: async(req, res)=>{
        const {email, userName, pwd} = req.body
        let pool = await poolPromise();
        pool.query(`SELECT * FROM users WHERE email = '${email}' OR userName = '${userName}' AND userPassword = '${pwd}' `)
        .then(data =>{
            if (data.recordset) {
                return res.status(200).json({
                    status: 200,
                    Success: true,
                    Message: 'Login successful',
                    Result: data.recordset
                }) &&
                    console.log(data.recordset)

            }

            res.status(404).json({
                Status: 404,
                Success: false,
                Message: 'Users not found Please signup',
                result: []
            })
        })

    },
    signup:async(req, res)=>{
        const{id, userName, email, pwd} = req.body
        let pool = await poolPromise()
        pool.query(`INSERT INTO users (userName, email, userPassword) VALUES('${userName}', '${email}', '${pwd}')`)
        .then(result=>{
            if (result.rowsAffected) {
                return res.status(200).json({
                    status: 200,
                    Success: true,
                    Message: "User Added"
                }) && console.log("User added")
            }
            res.status(403).json({
                status: 404,
                Success: false,
                Message: "User not added"
            })
        })
    },

    addPost:async(res, req)=>{
        const{id} = req.params
        const {post, userID} = req.body
        let pool = await poolPromise()
        pool.query(`INSERT INTO posts (userID, post) VALUES('${userID}','${post}')`)
        .then(result=>{

        })
    },
}
module.exports = { ...controllers }