const express = require("express");
const upload = require('../../config/multer');
const router = express.Router();
const UploadImg = require('../../Models/UploadImg')


router.post('/uploadimage', upload.single('file'), async (req, res) => {
    const { originalname: name, size, filename: key } = req.file;
    const upload = await UploadImg.create({
        name,
        size,
        key,
    });
    console.log(req.file);
    return res.json(
        {
            type: 'success',
            message: 'Imagem adicionada com sucesso!',
            filename: req.file.filename
        }     
    )  
})

router.delete('/deleteimage',)

module.exports = router;
