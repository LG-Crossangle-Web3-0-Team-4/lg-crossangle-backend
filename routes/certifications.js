const { models } = require('../sequelize');

var express = require('express');
var multer  = require('multer');
var router = express.Router();
// const fs = require('fs');

let upload = multer({ dest: '../uploads' });
let type = upload.single('file');

async function create(req, res) {
    await models.certification.create({
        address: req.body.address,
        name: req.body.name,
        status: '0',
        data: req.body.file,
    });
}

async function update(req, res) {
    await models.certification.update({
        status: req.body.status,
    }, {
        where: {
            id: req.body.id
        }
    });
}

async function get(req, res) {
    const certifications = await models.certification.findByPk(req.params.id);
    res.json(certifications);
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
    if(req.params.id < 3) {
        res.status(500).send('An error occurred: ' + err.message);
    }
    await get(req, res, (err) => {
        if (err) {
            res.status(500).send('An error occurred: ' + err.message);
        } else {
            res.status(200).send('ok');
        }
    });
});

router.post('/', type, async function(req, res, next) {
    console.log(req.body);
    console.log(req.file);

    // do create with the request and return the error if there is a problem.
    await create(req, res, (err) => {
        
        if (err) {
            res.status(500).send('An error occurred: ' + err.message);
        } else {
            res.status(200).send('ok');
        }
    });
});

router.patch('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
