import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const contactsApi = createApi({
  reducerPath: "contacts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => "contacts",
      //   providesTags: ["Contacts"],
      providesTags: (result, error, arg) => {
        return result
          ? [...result.map(({ id }) => ({ type: "Contacts", id })), "Contacts"]
          : ["Contacts"];
      },
    }),
    getContact: builder.query<Contact, string>({
      keepUnusedDataFor: 100000,
      providesTags: (result, error, id) => [{ type: "Contacts", id }],
      //   providesTags: ["Contacts"],
      query: (id) => `contacts/${id}`,
    }),
    addContact: builder.mutation<void, Contact>({
      invalidatesTags: ["Contacts"],
      query: (body) => ({
        url: "contacts",
        method: "POST",
        body: body,
      }),
    }),
    editContact: builder.mutation<void, Contact>({
      invalidatesTags: (_, __, arg) => [{ type: "Contacts", id: arg.id }],
      //   invalidatesTags: ["Contacts"],
      query: ({ id, ...rest }) => ({
        url: `contacts/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteContact: builder.mutation<void, string>({
      invalidatesTags: ["Contacts"],
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useAddContactMutation,
  useEditContactMutation,
  useDeleteContactMutation,
} = contactsApi;
