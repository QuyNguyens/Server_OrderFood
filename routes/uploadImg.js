const express = require('express');
const imageDownloaded = require('image-downloader');
const fs = require('fs');
const multer = require('multer');
const route = express.Router();

const photosMidleware = multer({dest:'uploads/'});
route.post('/upload-img',photosMidleware.array('photos',100),(req,res) =>{
    const uploadFiles = [];
    for(let i=0 ; i<req.files.length; i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path,newPath);
        uploadFiles.push(newPath.split('\\')[1]);
    }
    res.json(uploadFiles);
})

module.exports = route;