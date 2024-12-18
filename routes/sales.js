const express = require('express');
const multer = require('multer');
const path = require('path');

const {
    getVenta,
    createSale,
    getSale,
    updateSale,
    deleteSale,
    sendPdfByEmail
} = require('../controllers/salesController');


const router = express.Router();

router.get('/', getVenta);
router.post('/', createSale);
router.get('/:id', getSale);
router.put('/:id', updateSale);
router.delete('/:id', deleteSale);

const upload = multer({
    dest: path.join(__dirname, '../uploads/'),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos PDF'));
        }
    },
});

router.post('/send-pdf-email', upload.single('pdf'), sendPdfByEmail);

module.exports = router;
