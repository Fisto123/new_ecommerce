import cloudinaryModule from "cloudinary";

const cloudinary = cloudinaryModule.v2;
cloudinary.config({
  cloud_name: "fisto",
  api_key: "334449918889387",
  api_secret: "BW0QRRHbg2W3aI8kGgHKBfbF3ZA",
});

export default cloudinary;
