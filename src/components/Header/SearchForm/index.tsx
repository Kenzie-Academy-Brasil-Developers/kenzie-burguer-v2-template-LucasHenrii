import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledButton } from "../../../styles/button";
import { useContext } from "react";
import { ShopContext } from "../../../contexts/ShopContext";

const SearchForm = () => {
  const { setFilteredProducts, setSearchInput, searchInput } =
    useContext(ShopContext);

  const submit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setFilteredProducts(searchInput);
    setSearchInput("");
  };

  return (
    <StyledSearchForm onSubmit={submit}>
      <input
        type="text"
        placeholder="Digitar pesquisa"
        onChange={(event) => setSearchInput(event.target.value.toLowerCase())}
      />
      <StyledButton type="submit" $buttonSize="medium" $buttonStyle="green">
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
