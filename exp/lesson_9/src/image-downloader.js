var fs = require('fs');
var http = require('http');

class ImageDownloader {
    constructor() {
        this.file = fs.createWriteStream("file.jpg");
    }

    download(uri, filename, callback) {
        var file = fs.createWriteStream(filename);

        http.get(uri, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close(callback);
            });
        }).on('error', function (err) {
            fs.unlink(dest);
            if (callback) {
                callback(err.message);
            }
        });
    };
}

module.exports = ImageDownloader;