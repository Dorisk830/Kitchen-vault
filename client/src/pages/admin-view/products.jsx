import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: null,
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function validateForm() {
    const errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.price) errors.price = "Price is required";
    if (!formData.totalStock) errors.totalStock = "Total stock is required";
    if (!uploadedImageUrl) errors.image = "Image is required";  // Image validation

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Form is valid if there are no errors
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please fix the errors and try again.",
        variant: "destructive",
      });
      return;
    }

    const productData = {
      ...formData,
      image: uploadedImageUrl,
    };

    if (currentEditedId !== null) {
      dispatch(editProduct({ id: currentEditedId, formData: productData }))
        .then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            toast({ title: "Product updated successfully" });
          }
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Failed to update the product.",
            variant: "destructive",
          });
        });
    } else {
      dispatch(addNewProduct(productData))
        .then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            setUploadedImageUrl(""); // Reset image URL
            toast({ title: "Product added successfully" });
          } else {
            toast({
              title: "Error",
              description: "Failed to add the product.",
              variant: "destructive",
            });
          }
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Something went wrong while adding the product.",
            variant: "destructive",
          });
        });
    }
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          toast({ title: "Product deleted successfully" });
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to delete the product.",
          variant: "destructive",
        });
      });
  }

  function isFormValid() {
    // Ensure all fields except averageReview are filled, and image is uploaded
    return (
      Object.keys(formData)
        .filter((currentKey) => currentKey !== "averageReview")
        .map((key) => formData[key] !== "")
        .every((item) => item) && !!uploadedImageUrl
    );
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem.id || productItem._id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          setUploadedImageUrl(""); // Reset image URL
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
              formErrors={formErrors}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;