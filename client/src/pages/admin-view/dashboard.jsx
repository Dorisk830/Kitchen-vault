import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  useEffect(() => {
    // Fetch feature images on component mount
    dispatch(getFeatureImages());
  }, [dispatch]);

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      alert("Please upload an image before clicking upload.");
      return;
    }

    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  return (
    <div className="p-6">
      {/* Image Upload Component */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />

      {/* Upload Button */}
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      {/* Feature Images Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {Array.isArray(featureImageList) && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem, index) => (
            <div className="relative" key={index}>
              <img
                src={featureImgItem.image || "/path/to/fallback-image.jpg"}
                alt={`Feature ${index + 1}`}
                className="w-full h-[300px] object-cover rounded-lg shadow-md"
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No feature images available.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
