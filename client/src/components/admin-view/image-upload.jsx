import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary(imageFile, setUploadedImageUrl, setImageLoadingState) {
    if (!imageFile) return;
  
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
  
      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url); 
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageLoadingState(false);
    }
  }
  

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary(imageFile, setUploadedImageUrl, setImageLoadingState);
    }
  }, [imageFile, setUploadedImageUrl, setImageLoadingState]);
  

  useEffect(() => {
    if (uploadedImageUrl) {
      console.log("Uploaded Image URL:", uploadedImageUrl);
      // You can add any logic that uses the uploaded URL here
    }
  }, [uploadedImageUrl]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? "cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>

      {uploadedImageUrl && (
        <div>
          <h3 className="text-md font-semibold mt-4">Uploaded Image:</h3>
          <img src={uploadedImageUrl} alt="Uploaded" className="w-32 h-32 object-cover mt-2" />
        </div>
      )}
    </div>
  );
}

ProductImageUpload.propTypes = {
  imageFile: PropTypes.object,
  setImageFile: PropTypes.func.isRequired,
  imageLoadingState: PropTypes.bool.isRequired,
  uploadedImageUrl: PropTypes.string,
  setUploadedImageUrl: PropTypes.func.isRequired,
  setImageLoadingState: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  isCustomStyling: PropTypes.bool,
};

export default ProductImageUpload;
