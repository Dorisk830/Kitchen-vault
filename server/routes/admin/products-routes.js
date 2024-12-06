const express = require("express");
const { handleImageUpload, addProduct, editProduct, fetchAllProducts, deleteProduct } = require("../../controllers/admin/products-controller");
const { upload } = require("../../helpers/cloudinary");
const FeatureImage = require("../../models/FeatureImage");

const router = express.Router();

// Handle Image Upload
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

// Product Routes
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

// Feature Image Routes
router.delete("/feature-image/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const featureImage = await FeatureImage.findByIdAndDelete(id);

    if (!featureImage) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    res.status(200).json({ success: true, message: "Image deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Error occurred while deleting image" });
  }
});

module.exports = router;
