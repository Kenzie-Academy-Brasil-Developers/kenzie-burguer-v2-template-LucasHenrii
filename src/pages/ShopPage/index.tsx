import { StyledShopPage } from "./style";
import CartModal from "../../components/CartModal";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";

import { StyledContainer } from "../../styles/grid";
import { useContext } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import { UserContext } from "../../contexts/UserContext";

const ShopPage = () => {
  const { isModalOpen } = useContext(ShopContext);
  const { loading } = useContext(UserContext);

  return (
    <StyledShopPage>
      {isModalOpen ? <CartModal /> : null}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
