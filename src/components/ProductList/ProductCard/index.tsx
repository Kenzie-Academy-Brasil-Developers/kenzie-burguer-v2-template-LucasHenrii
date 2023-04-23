import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { useContext } from "react";
import { ShopContext } from "../../../contexts/ShopContext";

const ProductCard = () => {
  const { AddProductCart, searchProduct } = useContext(ShopContext);

  return (
    <>
      {searchProduct.map((product) => (
        <StyledProductCard key={product.id}>
          <div className="imageBox">
            <img src={product.img} alt={product.name} />
          </div>
          <div className="content">
            <StyledTitle tag="h3" $fontSize="three">
              {product.name}
            </StyledTitle>
            <StyledParagraph className="category">
              {product.category}
            </StyledParagraph>
            <StyledParagraph className="price">
              {product.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </StyledParagraph>
            <StyledButton
              $buttonSize="medium"
              $buttonStyle="green"
              onClick={() => AddProductCart(product)}
            >
              Adicionar
            </StyledButton>
          </div>
        </StyledProductCard>
      ))}
    </>
  );
};

export default ProductCard;
