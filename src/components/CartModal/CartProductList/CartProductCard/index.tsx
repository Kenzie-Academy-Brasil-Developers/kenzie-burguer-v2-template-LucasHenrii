import { MdDelete } from "react-icons/md";
import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import { useContext } from "react";
import { ShopContext } from "../../../../contexts/ShopContext";

const CartProductCard = () => {
  const { productCart, RemoveProductCart } = useContext(ShopContext);

  return (
    <>
      {productCart.map((product) => (
        <StyledCartProductCard key={product.id}>
          <div className="imageBox">
            <img src={product.img} alt={product.name} />
          </div>
          <div className="contentBox">
            <StyledTitle tag="h3" $fontSize="three">
              {product.name}
            </StyledTitle>
            <button
              type="button"
              aria-label="Remover"
              onClick={() => RemoveProductCart(product)}
            >
              <MdDelete size={24} />
            </button>
          </div>
        </StyledCartProductCard>
      ))}
    </>
  );
};

export default CartProductCard;
