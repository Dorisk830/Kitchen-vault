import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              Kes:{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">Kes:{product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

AdminProductTile.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    salePrice: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  setOpenCreateProductsDialog: PropTypes.func.isRequired,
  setCurrentEditedId: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default AdminProductTile;
