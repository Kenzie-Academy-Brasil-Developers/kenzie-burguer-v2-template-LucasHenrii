import { createContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IShopProps {
  children: React.ReactNode;
}

interface IShopContext {
  productCard: IShop[];
  productCart: IShop[];
  searchProduct: IShop[];
  isModalOpen: boolean;
  counter: number;
  searchInput: string;
  filteredProducts: string;
  AddProductCart: (product: IShop) => void;
  RemoveProductCart: (product: IShop) => void;
  IncrementarCounter: () => void;
  DecrementarCounter: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProductCart: React.Dispatch<React.SetStateAction<IShop[]>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setFilteredProducts: React.Dispatch<React.SetStateAction<string>>;
}

interface IShop {
  category: string;
  id: number;
  img: string;
  name: string;
  price: number;
}

export const ShopContext = createContext({} as IShopContext);

const ShopProvider = ({ children }: IShopProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productCard, setProductCard] = useState<IShop[]>([]);
  const [productCart, setProductCart] = useState<IShop[]>([]);
  const [filteredProducts, setFilteredProducts] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [counter, setCounter] = useState(0);

  const IncrementarCounter = () => {
    setCounter(counter + 1);
  };
  const DecrementarCounter = () => {
    setCounter(counter - 1);
  };

  const AddProductCart = (product: IShop) => {
    if (!productCart.some((prod) => prod.id === product.id)) {
      const addProduct = [...productCart, product];
      setProductCart(addProduct);
      toast.success("Produto adicionado com sucesso!");
    } else {
      toast.warning("Produto já está na lista!");
    }
  };

  const RemoveProductCart = (product: IShop) => {
    const newProductCart = productCart.filter((prod) => prod.id !== product.id);

    setProductCart(newProductCart);
  };

  const searchProduct = productCard.filter(
    (product) =>
      product.name.toLowerCase().includes(filteredProducts) ||
      product.category.toLowerCase().includes(filteredProducts)
  );

  useEffect(() => {
    const ShopProducts = async () => {
      const token = localStorage.getItem("@TOKEN");
      try {
        const { data } = await api.get<IShop[]>("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductCard(data);
      } catch (error) {}
    };
    ShopProducts();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        productCard,
        productCart,
        setProductCart,
        AddProductCart,
        RemoveProductCart,
        IncrementarCounter,
        DecrementarCounter,
        counter,
        searchInput,
        setSearchInput,
        filteredProducts,
        setFilteredProducts,
        searchProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
