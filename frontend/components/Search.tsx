import React from "react";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";
import { useCombobox, resetIdCounter } from "downshift";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/client";
import { debounce } from "lodash";
import { useRouter } from "next/router";

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: products(
      where: {
        OR: [
          { name: { contains: $searchTerm } }
          { description: { contains: $searchTerm } }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {
  const router = useRouter();

  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: "no-cache",
    }
  );

  const items = data?.searchTerms || [];

  const findItemsButChill = debounce(findItems, 350);

  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }: any) {
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || "",
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an Item",
            id: "search",
            className: "loading",
          })}
        />
        <DropDown {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <DropDownItem
                key={item.id}
                {...getItemProps({
                  item,
                })}
                highlighted={index === highlightedIndex}
              >
                <img
                  src={item.photo?.image.publicUrlTransformed}
                  alt={item.name}
                  width="50px"
                />
                {item.name}
              </DropDownItem>
            ))}
          {isOpen && !items.length && !loading && (
            <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
          )}
        </DropDown>
      </div>
    </SearchStyles>
  );
};

export default Search;
