const router = require('express').Router()
postModel = require('../model/blog'),
  postModel = require('../model/blog'),
  tagModel = require('../model/tag'),
  settingModel = require('../model/setting'),
  logger = require('../logger'),
  timeago = require('timeago.js'),
  async = require('async'),
  validator = require('validator'),
  markdown = require('markdown').markdown
  
router.use(require('./auth'))

router.use((req, res, next) => {
  if (res.app.locals.settings.description) {
    res.locals.path = req.path
    next()
  } else {
    return res.redirect('/admin/login')
  }
})

router.get('/', (req, res, next) => {
  let page = req.query.page ? req.query.page : '1',
    size = 10,
    skip = 0,
    tag = req.query.tag ? req.query.tag : ''
  if (validator.isInt(page)) {
    page = parseInt(page)
    if (page > 1) {
      skip = (page - 1) * size
    }
  }
  if (validator.isLowercase)

    async.auto({
    tags: (done) => {
      tagModel.find({
        is_del: false
      }).exec((err, tags) => {
        done(null, tags)
      })
    },
    queryTag: (done) => {
      if (!tag) {
        done(null, [])
        return
      }
      tagModel.find({
        is_del: false,
        value: tag
      }).exec((err, tags) => {
        done(null, tags)
      })
    },
    posts: ['queryTag', 'tags', ({
      queryTag,
      tags
    }, done) => {
      if (!queryTag.length) queryTag = tags
      postModel.find({
        is_del: false,
      }, null, {
        skip,
        limit: size
      }).where('tags').in(queryTag).exec((err, posts) => {
        done(null, posts)
      })
    }],
    pageTotal: ['queryTag', 'tags', ({
      queryTag,
      tags
    }, done) => {
      if (!queryTag.length) queryTag = tags
      postModel.find({
        is_del: false,
      }).where('tags').in(queryTag).count({}).exec((err, count) => {
        console.log(count);
        let total = count % size == 0 ? parseInt(count / size) : parseInt(count / size) + 1
        done(null, total)
      })
    }]
  }, (err, results) => {
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
    results.posts.forEach((item) => {
      item.create_time_str = timeago().format(new Date(item.create_time), 'zh_CN')
    })
    res.render('index', {
      posts: results.posts,
      tags: results.tags,
      tag,
      page,
      pageTotal: results.pageTotal
    })
  })

})

router.get('/about', (req, res, next) => {
  res.render('about')
})

router.get('/tags', (req, res, next) => {
  tagModel.find((err, tags) => {
    res.render('tags', {
      tags
    })
  })
})

router.get('/archives', (req, res, next) => {
  postModel.find({
    is_del: false
  }).populate('tags').exec((err, posts) => {
    let rs = {}
    posts.forEach((item) => {
      let year = new Date(item.create_time).getFullYear()
      if (!rs[year]) rs[year] = []
      rs[year].push(item)
    })
    res.render('list', {
      data: rs,
      counts: posts.length
    })
  })
})

router.get('/detail/:id', (req, res, next) => {
  async.auto({
    detail: (done) => {
      postModel.findByIdAndUpdate(req.params.id, {
        $inc: {
          pv: 1
        }
      }).populate('tags').exec((err, data) => {
        data.create_time_str = timeago().format(new Date(data.create_time), 'zh_CN')
        done(null, data)
      })
    },
    next: (done) => {
      postModel.find({
        _id: {
          '$gt': req.params.id
        },
        is_del: false
      }).limit(1).sort({
        _id: -1
      }).exec((err, data) => {
        done(null, data[0])
      })
    },
    prev: (done) => {
      postModel.find({
        _id: {
          '$lt': req.params.id
        },
        is_del: false
      }).limit(1).sort({
        _id: -1
      }).exec((err, data) => {
        done(null, data[0])
      })
    }
  }, (err, results) => {
    results.detail.content = markdown.toHTML(results.detail.content)
    res.render('detail', {
      post: results.detail,
      next: results.next,
      prev: results.prev
    })
  })
})

router.use('/admin', require('./admin'))

module.exports = router