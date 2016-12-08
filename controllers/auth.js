  var router = require('express').Router(),
    md5 = require('md5'),
    userModel = require('../model/user'),
    validator = require('validator')


  router.post('/admin/login', (req, res, next) => {
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
        if (user && user.pswd === pswd) {
          req.session.user = user
          return res.json({
            code: 0,
            info: 'success'
          })
        } else {
          return res.json({
            code: -1,
            info: '邮箱或者密码错误!'
          })
        }
      })
    }
  })

  router.get('/admin/login', (req, res, next) => {
    res.render('admin/login', {
      layout: 'base'
    })
  })
  router.get('/admin/logout', (req, res, next) => {
    req.session.user = null
    res.redirect('/admin/login')
  })

  module.exports = router