const poolPromise = require('../config/pool')

const controllers ={
    getAllPosts: async(req, res)=>{
        let pool = await poolPromise();
        pool.request()
        .execute('dbo.spGetAllPosts')
        .then(data=>{
            if (data.recordset) {
                return res.status(200).json({
                    Status: 200,
                    Success: true,
                    Message: 'posts fetched succesfully',
                    Result: data.recordset
                }) && console.log(data.recordset)
            }
            res.status(404).json({
                Status: 404,
                Success: false,
                Message: 'post not found',
                result: []
            })
        })
    },

    login: async(req, res)=>{
        const {email, pwd} = req.body
        let pool = await poolPromise();
        pool.request()
        .input('email',email)
        .input('pwd', pwd)
        .execute('dbo.spLogin')        
        .then(data =>{
            if (data.recordset.length == 0) {
                res.status(404).json({
                    Status: 404,
                    Success: false,
                    Message: 'Users not found Please signup',
                    result: []
                });
                return;

            }
            res.status(200).json({
                status: 200,
                Success: true,
                Message: 'Login successful',
                Result: data.recordset
            }) &&
                console.log(data.recordset)

        })


    },
    signup:async(req, res)=>{
        const{ userName, email, pwd} = req.body
        let pool = await poolPromise()
        pool.request()
        .input('userName', userName)
        .input('email', email)
        .input('pwd', pwd)
        .execute('dbo.spSignUp')
        .then(result=>{
            if (result.rowAffected) {
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
        const {post, userID} = req.body
        let pool = await poolPromise()
        pool.request()
        .input('userId', userID)
        .input('post', post)
        .execute('dbo.spAddPost')
        .then( result =>{
            if (result.rowsAffected) {
                return res.status(200).json({
                    status: 200,
                    Success: true,
                    Message: "Post Added Succesfully"
                }) && console.log("Post Added Succesfully")
            }   res.status(403).json({
                status: 404,
                Success: false,
                Message: result.recordset
            })
        }

        )

    },
}
module.exports = { ...controllers }