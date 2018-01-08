let fs= require('fs');

const getFileNameList = path => {
    let fileList = [];
    let dirList = fs.readdirSync(path);
    dirList.forEach(item => {
        if (item.indexOf('html') > -1) {
            fileList.push(item.split('.')[0]);
        }
    });
    return fileList;
};
let HTMLDirs = getFileNameList('./app/html');

module.exports = {
    cssPublicPath:"../",
    imgOutputPath:"img/",
    cssOutputPath:"css/[name].styles.css",
    devServerOutputPath:"../dist",
    assetsSubDirectory: 'static',
    HTMLDirs
}
