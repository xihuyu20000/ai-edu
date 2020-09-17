module.exports = app=>{
    const { User } = require("../../models/sys/user-model");
    const express = require('express')
    const router = express.Router()

    /**
     * @swagger
     * /api/user/staff 员工列表:
     *  get:
     *    tags:
     *      - sys/user
     */
    router.get('/staff', async(req, res)=>{
        const all = await User.find({style:'staff'})
        res.json(all)
    })

    /**
     * @swagger
     * /api/user/student 学生列表:
     *  get:
     *    tags:
     *      - sys/user
     */
    router.get('/student', async(req, res)=>{
        const all = await User.find({style:'student'})
        res.json(all);
    })

    /**
     * @swagger
     * /api/user/:id 查找:
     *  get:
     *    tags:
     *      - sys/user
     */
    router.get('/:id', async(req, res)=>{
        const user = await User.findById(req.params.id);
        res.json(user)
    })

    /**
     * @swagger
     * /api/user/:id  修改:
     *  put:
     *    tags:
     *       - sys/user
     */
    router.put('/:id', async(req, res)=>{
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        res.json(user)
    })

    /**
     * @swagger
     * /api/user/ 创建:
     *  post:
     *    tags:
     *      - sys/user
     */
    router.post('/', async(req, res)=>{
        if (await User.findOne({ username: req.body.username })) {
            return res.status(422).json({ msg: "名称已经存在" });
        }
        const user = await User.create(req.body)
        res.json(user)
    })

    /**
     * @swagger
     * /api/user/:id  删除:
     *  delete:
     *    tags:
     *      - sys/user
     */
    router.delete('/:id', async(req, res)=>{
        const user = await User.findByIdAndDelete(req.params.id)
        res.json(user != null);
    })

    app.use('/api/user', router)
}