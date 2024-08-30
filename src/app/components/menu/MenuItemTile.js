import AddToCartButton from "./AddToCartButton";

const MenuItemTile = ({ onAddToCart, ...item }) => {
  const { name, description, image, basePrice, sizes, extraIngredientsPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientsPrices?.length > 0;
  return (
    <div
      className="bg-gray-200 p-4 rounded-lg text-center
  group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
    >
      <div className="text-center ">
        <img
          src={image}
          className="max-h-auto max-h-24 block mx-auto"
          alt="pizza"
        />
      </div>

      <h1 className="font-semibold my-2">{name}</h1>
      <p className="text-gray-500 text-sm max-h-16 line-clamp-3">
        {description}
      </p>
     <AddToCartButton image={image} hasSizesOrExtras={hasSizesOrExtras} onClick={onAddToCart} basePrice={basePrice} />
    </div>
  );
};

export default MenuItemTile;
