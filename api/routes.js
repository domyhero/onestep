// const CryptoJS = require('crypto-js')
const config = require('./config/config')
const COS = require('cos-nodejs-sdk-v5')
const fs = require('fs')
var path = require('path')
const multer = require('multer')
const ii = multer({dest: `./public/ii`})

const cos = new COS({
  AppId: config.AppId,
  SecretId: config.SecretId,
  SecretKey: config.SecretKey
})
module.exports = function (app) {
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    if (req.method === 'OPTIONS') {
      res.send(200)
    } else {
      next()
    }
  })

  app.get('/getservice', function (req, res) {
    cos.getService(function (err, data) {
      if (err) {
        return res.status(403).json({err})
      } else {
        return res.status(200).json({data})
      }
    })
  })

  app.post('/getbucket', function (req, res) {
    var params = {
      Bucket: config.Bucket,
      Region: config.Region
    }
    cos.getBucket(params, function (err, data) {
      if (err) {
        return res.status(403).json({err})
      } else {
        return res.status(200).json({data})
      }
    })
  })

  app.post('/create/bucket', function (req, res) {
    let params = {
      Bucket: req.body.Bucket,
      Region: req.body.Region
    }
    cos.putBucket(params, function (err, data) {
      if (err) {
        return res.status(403).json({err})
      } else {
        return res.status(200).json({data})
      }
    })
  })

  app.post('/postobject', ii.single('file'), function (req, res) {
    var filename = req.file.filename
    var filepath = path.resolve('./public/ii', filename)
    fs.unlinkSync(filepath)
    return res.status(200).json({filename})
    // var filepath = path.resolve('./public/ii', filename)
    // let params = {
    //   Bucket: config.Bucket,
    //   Region: config.Region,
    //   Key: `react/${req.file.originalname}`,
    //   ContentLength: fs.statSync(filepath).size,
    //   Body: fs.createReadStream(filepath)
    // }
    // cos.putObject(params, function (err, data) {
    //   if (err) {
    //     fs.unlinkSync(filepath)
    //     return res.status(403).json({err})
    //   } else {
    //     fs.unlinkSync(filepath)
    //     return res.status(200).json({data})
    //   }
    // })
  })
}
