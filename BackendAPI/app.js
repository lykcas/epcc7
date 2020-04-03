const fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
// Route loading
var mount = require('mount-routes')

var app = express()


/**
 *
 *Public system initialization
 *
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Initialize the database module
var database = require('./modules/database')
database.initialize(app, function (err) {
    if (err) {
        console.error('fail to connect to database %s', err)
    }
})

/**
 *
 *	Background management system initialization
 *
 */
// Get Administrator Logic Module
var managerService = require(path.join(process.cwd(), 'services/ManagerService'))
// Get role service module
var roleService = require(path.join(process.cwd(), 'services/RoleService'))

// Set cross domain and corresponding data format
app.all('/api/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
  /*Make options request return quickly*/ else next()
})

// Initialize the unified response mechanism
var resextra = require('./modules/resextra')
app.use(resextra)

// Initialize background login passport policy
admin_passport = require('./modules/passport')
// Set the login module login function connection passport policy
admin_passport.setup(app, managerService.login)
// Set passport login entry point
app.use('/api/private/v1/login', admin_passport.login)
// Set passport authentication path
app.use('/api/private/v1/*', admin_passport.tokenAuth)

// Get verification module
var authorization = require(path.join(process.cwd(), '/modules/authorization'))

// Set global permissions
authorization.setAuthFn(function (req, res, next, serviceName, actionName, passFn) {
    if (!req.userInfo || isNaN(parseInt(req.userInfo.rid))) return res.sendResult('ÎÞ½ÇÉ«ID·ÖÅä')
    // Verify permissions
    roleService.authRight(req.userInfo.rid, serviceName, actionName, function (err, pass) {
        passFn(pass)
    })
})

/**
 *
 *Initial route
 *
 */
// With path usage and can print out the way there are tables
mount(app, path.join(process.cwd(), '/routes'), true)

app.all('/ueditor/ue', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X_Requested_With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') res.send(200)
  /*Make options request return quickly  */ else next()
})

// Rich text editor upload
var ueditor = require(path.join(process.cwd(), '/modules/ueditor'))
// Rich text control processing 
app.use('/ueditor/ue', ueditor)
//. Set Rich Text Space Address
app.use('/ueditor', express.static('public/ueditor'))

app.use('/tmp_uploads', express.static('tmp_uploads'))
app.use('/x/common', express.static('uploads/common'))
app.use('/uploads/goodspics', express.static('uploads/goodspics'))

var upload_config = require('config').get('upload_config')
app.use('/' + upload_config.get('upload_ueditor'), express.static(upload_config.get('upload_ueditor')))

const logistics = require('./modules/Logistics.js')
app.get('/api/private/v1/kuaidi/:orderno', logistics.getLogisticsInfo)

// Define logs
// var log4js = require('./modules/logger');
// log4js.use(app);

/**
 *
 * Unified response to no response
 *
 */
// If there is no path processing, return Not Found
app.use(function (req, res, next) {
    res.sendResult(null, 404, 'Not Found')
})

app.listen(8888)

module.exports = app
