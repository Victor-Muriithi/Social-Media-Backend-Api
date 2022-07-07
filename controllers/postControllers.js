const poolPromise = require('../config/pool')

const controllers = {
    getAllPosts: async (req, res) => {
        let pool = await poolPromise();
        pool.request()
            .execute('dbo.spGetAllPosts')
            .then(data => {
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

    login: async (req, res) => {
        const { email, pwd } = req.body
        let pool = await poolPromise();
        pool.request()
            .input('email', email)
            .input('pwd', pwd)
            .execute('dbo.spLogin')
            .then(data => {
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
    signup: async (req, res) => {
        const { userName, email, pwd } = req.body
        try {
            let pool = await poolPromise()
            await pool.request()
                .input('userName', userName)
                .input('email', email)
                .input('pwd', pwd)
                .execute('dbo.spSignUp')
                .then(result => {
                    if (result.rowAffected) {
                        return res.status(200).json({
                            status: 200,
                            Success: true,
                            Message: "User Added"
                        }) && console.log("User added")
                    }
    
                })
            
        } catch (error) {
            console.log(error.message)
            res.status(403).json({
                status: 404,
                Success: false,
                Message: error.message
            })
        }

    },

    addPost: async (req, res) => {
        const { userID, post } = req.body;
        try {
            let pool = await poolPromise()
            await pool.request()
                .input('userID', userID)
                .input('post', post)
                .execute('dbo.spAddPosts')
                .then(result => {
                    if (result.rowsAffected.length > 0) {

                        res.status(200).json({
                            status: 200,
                            Success: false,
                            Message: "Post added Succesfully"
                        });
                        return;
                    }
                })

        } catch (error) {
            res.status(404).json({
                status: 404,
                Success: false,
                Message: error.message
            }) && console.log(error.message)
        }
    },

    addComment:async (req, res)=>{
       const {userID, postID, comment} = req.body
       try {
        let pool = await poolPromise()
       await pool.request()
       .input('userID', userID)
       .input('postID', postID)
       .input('comment', comment)
       .execute('dbo.spAddComment')
       .then(result=>{
        console.log(result)
        if(result.rowsAffected > 0){
            res.status(201).json({
                status:200,
                Success:true,
                Message: 'Comment added successfully'
            });
            return;
        }
            res.status(403).json({
                status:403,
                Success:false,
                Message:'Failed to add comment'
            })
       })
       } catch (error) {
        console.log(error.message)
            res.status(404).json({
                Status:404,
                Success:false,
                Message:error.message
            })
       } 
    },

    addReply:async(req, res)=>{
        const {commentID, reply}=req.body;
        try {
            let pool = await poolPromise()
            await pool.request()
            .input('commentID', commentID)
            .input('reply', reply)
            .execute('dbo.spAddReply')
            .then(result=>{
                console.log(result)
                if(result.rowsAffected > 0){
                    res.status(201).json({
                        status:200,
                        Success:true,
                        Message: 'Reply added successfully'
                    });
                    return;
                }
                    res.status(403).json({
                        status:403,
                        Success:false,
                        Message:'Failed to add reply'
                    })

            })
        } catch (error) {
            console.log(error.message)
            res.status(404).json({
                Status:404,
                Success:false,
                Message:error.message
            })
        }
    },


}
module.exports = { ...controllers }