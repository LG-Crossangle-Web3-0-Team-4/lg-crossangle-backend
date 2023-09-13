const { models } = require('../sequelize/index.js');

var express = require('express');
var multer  = require('multer');
var router = express.Router();

// router.use(express.json());
// router.use(express.urlencoded({ extended: false }));

// const fs = require('fs');

// let upload = multer({ dest: '../uploads' });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
        let mimeType;
        switch (file.mimetype) {
            case "image/jpeg":
            mimeType = "jpg";
            break;
            case "image/png":
            mimeType = "png";
            break;
            case "image/gif":
            mimeType = "gif";
            break;
            case "image/bmp":
            mimeType = "bmp";
            break;
            case "video/mp4":
            mimeType = "mp4";
            break;
            case "video/avi":
            mimeType = "png";
            break;
            case "video/mov":
            mimeType = "mov";
            break;
            case "video/wmv":
            mimeType = "wmv";
            break;
            case "application/pdf":
            mimeType = "pdf";
            break;
            case "application/msword":
            mimeType = "docx";
            break;
            case "application/zip":
            mimeType = "zip";
            break;
            case "application/x-rar-compressed":
            mimeType = "rar";
            break;
            default:
            mimeType = "";
            break;
        }
        cb(null, file.fieldname + '-' + Date.now() + '.' + mimeType)
	}
});

const upload = multer({ storage: storage })
let type = upload.single('file');

async function create(req, res) {
    await models.certification.create({
        address: req.body.address,
        name: req.body.name,
        status: 0,
        // data: req.body.file,
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('ok');

}

async function list(req, res) {
    const certifications = await models.certification.findAll({
        where: {
            address: req.params.address
        }
    })
    res.json(certifications);
}

async function update(req, res) {
    await models.certification.update({
        status: req.body.status,
    }, {
        where: {
            id: req.params.id
        }
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('ok');
}

async function get(req, res) {
    const certifications = await models.certification.findByPk(req.params.id);
    res.json(certifications);
}

// async function mint(req, res) {
// }

router.get('/:address', async function(req, res, next) {
    await list(req, res, (err) => {
        if (err) {
            res.status(500).send('An error occurred: ' + err.message);
        } else {
            res.status(200).send('ok');
        }
    })
});

router.get('/sbt/:id', async function(req, res, next) {
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
    await create(req, res, (err) => {
        if (err) {
            res.status(500).send('An error occurred: ' + err.message);
        } else {
            res.status(200).send('ok');
        }
    });
});

router.patch('/:id', async function(req, res, next) {
    await update(req, res, (err) => {
        if (err) {
            res.status(500).send('An error occurred: ' + err.message);
        } else {
            res.status(200).send('ok');
        }
    });
});

module.exports = router;
