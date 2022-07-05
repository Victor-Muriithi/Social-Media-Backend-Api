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
        pool.query(`SELECT * FROM `)
    }
}
module.exports = { ...controllers }