const router = require('express').Router(),
    config = require('../../config')

router.post('/avator', (req, res, next) => {
    let upload = require('./upload').single('avator')
    upload(req, res, err => {
        if (err) {
            console.log(err)
            return
        }
        if (req.file)
            res.json({
                code: 0,
                info: {
                    imgUrl: config.UPLOAD_DIR + req.file.filename
                }
            })
    })
})

module.exports = router
