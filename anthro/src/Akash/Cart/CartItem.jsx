import { CloseButton, Flex, Link } from "@chakra-ui/react";
import * as React from "react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";
import { useDispatch } from "react-redux";
import { deleteCartItem, getCartItem } from "../../Redux/cart/action";
import { useEffect } from "react";
// import { useState } from "react";

const QuantitySelect = (props) => {
  // const [quantity, setQuantity] = useState(1);

  // console.log(quantity);
  return (
    // <Select
    //   maxW="64px"
    //   aria-label="Select quantity"
    //   focusBorderColor={useColorModeValue("blue.500", "blue.200")}
    //   {...props}
    //   onChange={(e) => setQuantity(e.target.value)}
    // >
    //   <option value="1">1</option>
    //   <option value="2">2</option>
    //   <option value="3">3</option>
    //   <option value="4">4</option>
    // </Select>
    <></>
  );
};

export const CartItem = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let data = dispatch(getCartItem());
    console.log("data", data);
  }, []);

  const {
    isGiftWrapping,
    category,
    name,
    title,

    img1,
    currency,
    price,

    id,
  } = props;

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={category}
        description={title}
        image={img1}
        isGiftWrapping={isGiftWrapping}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <QuantitySelect
        // value={quantity}
        // onChange={(e) => {
        //   onChangeQuantity?.(e.currentTarget.value);
        // }}
        />

        <PriceTag price={price} currency={currency} />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => {
            dispatch(deleteCartItem(id)).then((res) => {
              console.log(res);
              if (res.type === "DELETE_ITEM_SUCCESS") {
                dispatch(getCartItem());
              }
            });
          }}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <Link
          fontSize="sm"
          textDecor="underline"
          onClick={() => {
            dispatch(deleteCartItem(id))
              .then((res) => {
                console.log(res);
                if (res.type === "DELETE_ITEM_SUCCESS") {
                  dispatch(getCartItem());
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Delete
        </Link>
        <QuantitySelect
        // value={quantity}
        // onChange={(e) => {
        //   onChangeQuantity?.(+e.currentTarget.value);
        // }}
        />
        {/* <PriceTag price={price} currency={currency} /> */}
      </Flex>
    </Flex>
  );
};
