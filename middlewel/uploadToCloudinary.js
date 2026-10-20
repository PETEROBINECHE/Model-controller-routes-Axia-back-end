import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.my_cloud_name,
  api_key: process.env.my_key,
  api_secret: process.env.my_api_secret,
});

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const steam = cloudinary.uploader.upload_stream({resource_type: "image"}, 
            (error, result) => {
                if(error) return reject(error);
            resolve(result);
        })

        steam.end(buffer);
    })
}

export default uploadToCloudinary;