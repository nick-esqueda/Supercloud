import React, { useState } from 'react';
// import AWS from 'aws-sdk'
const AWS = require('aws-sdk/dist/aws-sdk-react-native');


const S3_BUCKET = 'supercloud-bucket';
const REGION = 'us-east-1';

AWS.config.update({
  accessKeyId: 'AKIA572T5VQT4L66QVPR',
  secretAccessKey: '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'
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
})

const UploadInputS3 = () => {

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const uploadFile = (file) => {
    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name
    };

    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100))
      })
      .send((err) => {
        if (err) console.log(err)
      })
  }


  return <div>
    <div>Native SDK File Upload Progress is {progress}%</div>
    <input type="file" onChange={handleFileInput} />
    <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
  </div>
}

export default UploadInputS3;
