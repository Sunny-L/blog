var router = require('express').Router(),
    postModel = require('../../model/blog'),
    tagModel = require('../../model/tag'),
    userModel = require('../../model/user'),
    settingModel = require('../../model/setting'),
    logger = require('../../logger'),
    validator = require('validator'),
    md5 = require('md5'),
    path = require('path')
async = require('async')

router.post('/login', (req, res, next) => {
    var username = req.body.username,
        pswd = req.body.password;

    var errorInfo
    if (!username || !validator.isEmail(username)) {
        errorInfo = '邮箱错误'
    } else if (!pswd || !validator.isLength(pswd, {
            min: 6
        })) {
        errorInfo = '密码错误'
    }
    if (errorInfo) {
        return res.json({
            code: -1,
            info: errorInfo
        })

    } else {
        pswd = md5(pswd)
        userModel.findOne({
            email: username
        }, (err, user) => {
            if (err) res.json({
                code: -1,
                info: '邮箱或者密码错误!'
            })
            if (user.pswd === pswd) {
                req.session.user = user
                res.json({
                    code: 0,
                    info: 'success'
                })
            } else {
                res.json({
                    code: -1,
                    info: '邮箱或者密码错误!'
                })
            }
        })
    }


})

router.get('/login', (req, res, next) => {
    res.render('admin/login')
})
router.get('/logout', (req, res, next) => {
    res.session = null
    res.redirect('/admin/login')
})

router.use((req, res, next) => {
    if (req.session.user) next()
    else {
        if (req.xhr) {
            res.json({
                code: -1,
                info: 'need login'
            })
        } else {
            res.redirect('/admin/login')
        }
    }
})

router.use((req, res, next) => {
    settingModel.find((err, settings) => {
        if (err) {
            logger.info(err)
            res.json({
                code: -100,
                info: {
                    result: err
                }
            })
            return
        }
        res.app.locals.settings = settings[0]
        next()
    })
})

router.get('/', (req, res, next) => {
    res.sendFile(process.cwd() + '/public/dashboard/dist/index.html')
})
router.use('/upload', require('../upload'))


router.get('/getCounts', (req, res, next) => {
    async.parallel({
        posts: cb => {
            postModel.count({}, (err, count) => {
                cb(err, count)
            })
        },
        views: cb => {
            postModel.aggregate({
                $group: {
                    _id: null,
                    views: {
                        $sum: '$pv'
                    }
                }
            }, (err, count) => {
                cb(err, count)
            })
        }
    }, (err, results) => {
        if (err) logger.info(err)
        res.json({
            code: 0,
            counts: {
                posts: results.posts,
                views: results.views,
                messages: 0
            }
        })
    })
})

router.get('/posts', (req, res, next) => {
    postModel.find({
        is_del: false
    }).populate('tags').exec((err, posts) => {
        if (err) {
            logger.info(err)
            res.json({
                code: -100,
                info: {
                    result: err
                }
            })
            return
        }
        res.json({
            code: 0,
            info: {
                posts
            }
        })
    })
})

router.get('/posts/detail/:id', (req, res, next) => {
    postModel.findById(req.params.id).populate('tags').exec((err, post) => {
            if (err) {
                logger.error(err)
            }
            res.json({
                code: 0,
                info: {
                    post
                }
            })
        })
        // postModel.findByIdAndUpdate(req.params.id, {})
})

router.post('/posts/publish', (req, res, next) => {
    let post = req.body
    post = Object.assign({}, post, {
        is_publish: true,
        is_del: false,
        last_update_time: Date.now()
    })
    delete post.create_time
    if (req.body._id) {
        postModel.update({
            _id: req.body._id
        }, post, (err, result) => {
            if (err) {
                logger.info(err)
                res.json({
                    code: -100,
                    info: {
                        result: err
                    }
                })
                return
            }
            res.json({
                code: 0,
                info: {
                    post: result
                }
            })
        })
    } else {
        post.create_time = Date.now()
        postModel.create(post, (err, result) => {
            if (err) {
                logger.info(err)
                res.json({
                    code: -100,
                    info: {
                        result: err
                    }
                })
                return
            }
            res.json({
                code: 0,
                info: {
                    post: result
                }
            })
        })
    }
})

router.post('/posts/save_to_draft', (req, res, next) => {
    let post = req.body
    post = Object.assign({}, post, {
        is_publish: false,
        is_del: false,
        last_update_time: Date.now()
    })
    delete post.create_time
    if (req.body._id) {
        postModel.update({
            _id: req.body.id
        }, post, (err, result) => {
            if (err) {
                logger.info(err)
                res.json({
                    code: -100,
                    info: {
                        result: err
                    }
                })
                return
            }
            res.json({
                code: 0,
                info: {
                    post: result
                }
            })
        })
    } else {
        req.body.create_time = Date.now()
        postModel.create(post, (err, result) => {
            if (err) {
                logger.info(err)
                res.json({
                    code: -100,
                    info: {
                        result: err
                    }
                })
                return
            }
            res.json({
                code: 0,
                info: {
                    post: result
                }
            })
        })
    }
})

router.get('/posts/del/:id', (req, res, next) => {
    let post = req.body
    postModel.findByIdAndUpdate(req.params.id, {
        is_publish: false,
        is_del: true
    }, (err, result) => {
        if (err) {
            logger.info(err)
            res.json({
                code: -100,
                info: {
                    result: result
                }
            })
            return
        }
        res.json({
            code: 0,
            info: {
                post: result
            }
        })
    })
})

router.get('/tags', (req, res, next) => {
    tagModel.find((err, tags) => {
        if (err) {
            logger.info(err)
            res.json({
                code: -100,
                info: {
                    result: err
                }
            })
            return
        }
        res.json({
            code: 0,
            info: {
                tags
            }
        })
    })
})

router.post('/tags/save', (req, res, next) => {
    if (req.body._id) {
        tagModel.update({
            _id: req.body._id
        }, req.body, (err, tag) => {
            if (err) {
                logger.info(err)
                res.json({
                    code: -100,
                    info: {
                        result: err
                    }
                })
                return
            }
            res.json({
                code: 0,
                info: {
                    tag
                }
            })
        })
    } else {
        tagModel.create(req.body, (err, tag) => {
            if (err) {
                logger.info(err)
                res.json({
                    code: -100,
                    info: {
                        result: err
                    }
                })
                return
            }
            res.json({
                code: 0,
                info: {
                    tag
                }
            })
        })
    }
})

router.get('/tags/del', (req, res, next) => {
    tagModel.remove({
        _id: req.query._id
    }, (err, tag) => {
        if (err) {
            logger.info(err)
            res.json({
                code: -100,
                info: {
                    result: err
                }
            })
            return
        }
        res.json({
            code: 0,
            info: {
                tag
            }
        })
    })
})

router.get('/system', (req, res, next) => {
    res.render('admin/system', {
        layout: false
    })
})

router.get('/settings', (req, res, next) => {
    settingModel.find((err, settings) => {
        if (err) {
            logger.info(err)
            res.json({
                code: -100,
                info: {
                    result: err
                }
            })
            return
        }
        res.json({
            code: 0,
            info: {
                settings
            }
        })
    })
})

router.post('/settings', (req, res, next) => {
    let option
    if (req.body._id) {
        option = {}
    } else {
        option = {
            upsert: true,
            setDefaultsOnInsert: true
        }
    }
    settingModel.findOneAndUpdate(req.body._id, req.body, option, (err, settings) => {
        if (err) {
            logger.info(err)
            res.json({
                code: -100,
                info: {
                    result: err
                }
            })
            return
        }
        res.json({
            code: 0,
            info: {
                settings
            }
        })
    })
})

module.exports = router