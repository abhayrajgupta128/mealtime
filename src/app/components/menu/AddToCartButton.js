import FlyingButton from "react-flying-item";

const AddToCartButton = ({ hasSizesOrExtras, onClick, basePrice, image }) => {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
          <div onClick={onClick}>Add to cart ${basePrice}</div>
        </FlyingButton>
      </div>
    );
  }
  return (
    <button
      onClick={onClick}
      className="bg-primary mt-4 text-white rounded-full px-6 py-2"
    >
      <span>Add to cart (from ${basePrice})</span>
    </button>
  );
};

export default AddToCartButton;
