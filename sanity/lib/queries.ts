import { defineQuery } from "next-sanity";

export const GET_PRODUCTS = defineQuery(`*[_type=='product']`);
export const PRODUCT_BY_ID = defineQuery(`*[_type=='product' && _id==$id][0]{
  title, 
  price, 
  discountPrice, 
  category, 
  slug, 
  image, 
  description}`);
export const USER_BY_ID = defineQuery(`*[_type=='user' && id==$id][0]`);
export const USER_BY_SANITY_ID = defineQuery(
  `*[_type=='user' && _id ==$id][0]`
);
export const PRODUCTS_BY_NAME = defineQuery(
  `*[_type=='product' && title in $array]`
);
export const PRODUCT_BY_NAME = defineQuery(
  `*[_type=='product' && title == $title]`
);
