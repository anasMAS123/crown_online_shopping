import { defineField, defineType } from "sanity";

export const user = defineType({
  name: "user",
  title: "users",
  type: "document",
  fields: [
    defineField({
      name: "id",
      type: "string",
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
            },
            {
              name: "pieces",
              type: "number",
            },
          ],
        },
      ],
    }),
  ],
});
