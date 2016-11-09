var settingModel = require('../model/setting')

module.exports.initSettings = (req, res, next) => {
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
}