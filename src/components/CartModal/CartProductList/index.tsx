import CartProductCard from "./CartProductCard";

import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { useContext } from "react";
import { ShopContext } from "../../../contexts/ShopContext";

const CartProductList = () => {
  const { productCart, setProductCart, counter } = useContext(ShopContext);

  const total = productCart.reduce((previous, productValue) => {
    return previous + productValue.price;
  }, 0);

  return (
    <>
      {productCart.length > 0 ? (
        <StyledCartProductList>
          <ul>
            <CartProductCard />
          </ul>

          <div className="totalBox">
            <StyledParagraph>
              <strong>Total</strong>
            </StyledParagraph>
            <StyledParagraph className="total">
              Total:{" "}
              {total.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </StyledParagraph>
          </div>
          <StyledButton
            $buttonSize="default"
            $buttonStyle="gray"
            onClick={() => setProductCart([])}
          >
            Remover todos
          </StyledButton>
        </StyledCartProductList>
      ) : null}
    </>
  );
};

export default CartProductList;
