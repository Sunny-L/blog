var router = require('express').Router(),
    postModel = require('../../model/blog'),
    tagModel = require('../../model/tag'),
    settingModel = require('../../model/setting'),
    logger = require('../../logger'),
    async = require('async')

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
                messages: 20
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