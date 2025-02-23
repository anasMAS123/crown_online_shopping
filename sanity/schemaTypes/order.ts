import { defineField, defineType } from "sanity";

export const order = defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "address",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "cart",
      type: "array",

      of: [
        {
          type: "object",
          fields: [
            {
              name: "item",
              type: "string",
              readOnly: true,
            },
            {
              name: "pieces",
              type: "number",
              readOnly: true,
            },
            {
              name: "priceBeforeDiscount",
              type: "number",
              readOnly: true,
            },
            {
              name: "priceAfterDiscount",
              type: "number",
              readOnly: true,
            },
            {
              name: "finalPrice",
              type: "number",
              readOnly: true,
            },
          ],
        },
      ],
    }),
  ],
});
