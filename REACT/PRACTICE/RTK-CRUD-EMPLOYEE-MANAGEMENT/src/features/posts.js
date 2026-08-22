import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Post'], // Enables cache tag tracking
  endpoints: (builder) => ({
    // 1. Get all posts
    getAllPost: builder.query({
      query: () => 'posts',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post', id })), { type: 'Post', id: 'LIST' }]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    // 2. Get post by ID
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    // 3. Get posts by limit
    getPostByLimit: builder.query({
      query: (num) => `posts?_limit=${num}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post', id })), { type: 'Post', id: 'LIST' }]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    // 4. Update post (PUT / PATCH)
    updatePost: builder.mutation({
      query: ({ id, ...updatedPost }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: updatedPost,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
      ],
    }),

    // 5. Delete post (DELETE)
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Post', id },
        { type: 'Post', id: 'LIST' },
      ],
    }),
  }),
});

// Export all auto-generated hooks
export const {
  useGetAllPostQuery,
  useGetPostByIdQuery,
  useGetPostByLimitQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;