import AWS from "aws-sdk";
import { blogs, courses, gallery } from "~/database/index.server";
// import 'aws-sdk/lib/maintenance_mode_message';

// Suppress AWS maintenance mode messages
// (AWS as any).lib.maintenance_mode_message.suppress = true;

// Set the region and access keys
AWS.config.update({
  region: "ap-south-1",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

interface FileData {
  name: string;
  data: Buffer;
}

interface Data {
  files: {
    file: FileData;
  };
}
// const payload = {
//   data:{
//     name,
//     position,
//     type:gallery
//   },
//   location ,
//   Body : UArray
// }
const uploadFileToAWS = (payload: any) => {
  const { data, location, Body } = payload;

  // Set the parameters for the file you want to upload
  const params: AWS.S3.PutObjectRequest = {
    Bucket: "iias-bucket",
    Key: location,
    Body: Body,
  };

  return new Promise((resolve, reject) => {
    console.log("nvljsnvljsnvlsv", payload);
    s3.upload(params, async (err, uploadData) => {
      if (err) {
        console.log("error:::::::", err.message);
        reject({ error: true, message: err.message });
      } else {
        console.log("data:::::::::", uploadData);
        let insertData = {};
        if (payload.type === "gallery") {
          insertData = {
            position: data.position,
            type: data.type,
            name: data.name,
            img_url: uploadData.Location,
          };

          await gallery.insertOne(insertData);
        }
        if (payload.type === "blogs") {
          insertData = {
            title: data.title,
            description: data.description,
            category: data.category,
            document: uploadData.Location,
            fileName: data.fileName,
          };
          await blogs.insertOne(insertData);
        }
        if (payload.type === "courses") {
          insertData = {
            title: data.title,
            description: data.description,
            duration: data.duration,
            category: data.category,
          };
          await courses.insertOne(insertData);
        }

        resolve({
          error: false,
          message: "File Upload Success!",
          data: insertData,
        });
      }
    });
  });
};

export default uploadFileToAWS;
