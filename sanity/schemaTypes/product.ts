import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "products",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "image",
      type: "url",
    }),
    defineField({
      name: "category",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Clothes-Men", value: "clothes-men" },
          { title: "Clothes-Women", value: "clothes-women" },
          { title: "Clothes-Kids", value: "clothes-kids" },
          { title: "Sports-Men", value: "sports-men" },
          { title: "Sports-Women", value: "sports-women" },
          { title: "Sports-Kids", value: "sports-kids" },
        ],
      },
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "price",
      type: "number",
    }),
    defineField({
      name: "discountPrice",
      type: "number",
    }),
  ],
});
