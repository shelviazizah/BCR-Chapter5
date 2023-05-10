// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "diu6pnlfl", // TODO: Ganti dengan cloudname-mu
    api_key: "257994995336323", // TODO: Ganti dengan API Key-mu
    api_secret: "rogYJgZO5wAPi1v7aOP0h_dvAJ8", // TODO: Ganti dengan API Secret-mu
    secure: true,
});

module.exports = { cloudinary };
