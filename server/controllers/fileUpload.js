const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config = new AWS.Config({
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    region: process.env.AWS_REGION
});
var s3 = new AWS.S3();

var uploadToS3 = (file, callback) => {
  let params = {
    Bucket: 'mardon-chat-bucket',
    Key: file.filename,
    Body: fs.createReadStream(file.path),
    ACL: 'public-read'
  };

  s3.putObject(params, function(err, data) {
    if (err) {
      callback({
        success: false,
        message: "Couldn't upload a file: " + err
      });
    } else {
      callback({
        success: true,
        message: 'A file was successfully uploaded to the server'
      });
    }
  });
  fs.unlink(file.path, function (err, data) {
    console.log('file was deleted');
  });
};

module.exports = uploadToS3;
