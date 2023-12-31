import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const workoutApi = createApi({
  reducerPath: "workoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_VITALITY_API_HOST}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => "/token",
      transformResponse: (response) => response?.account,
      providesTags: ["Account"],
    }),
    login: builder.mutation({
      query: (body) => {
        const formData = new FormData();
        formData.append("username", body.username);
        formData.append("password", body.password);
        return {
          url: "/token",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Account", { type: "Accounts", id: "LIST" }],
    }),
    signup: builder.mutation({
      query: (body) => {
        return {
          url: "/api/accounts",
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: [
        "Account",
        { type: "Accounts", id: "LIST" },
        "Incompleted",
        "Completed",
      ],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "DELETE",
      }),
      invalidatesTags: [
        "Account",
        "Incompleted",
        "Completed",
        "CardioDetails",
        "StrengthDetails",
        { type: "Accounts", id: "LIST" },
      ],
    }),
    // ########################################################################################
    getIncompletedWorkouts: builder.query({
      query: () => "/api/workouts/incompleted",
      providesTags: ["Incompleted"],
    }),
    getCompletedWorkouts: builder.query({
      query: () => "/api/workouts/completed/",
      providesTags: ["Completed"],
    }),
    // ########################################################################################
    createCardioWorkouts: builder.mutation({
      query: (body) => {
        return {
          url: "/api/workouts/cardio",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Incompleted", "Completed"],
    }),
    getCardioWorkoutDetails: builder.query({
      query: (id) => `/api/workouts/cardio/${id}/`,
      providesTags: ["CardioDetails"],
    }),
    deleteCardioWorkout: builder.mutation({
      query: (id) => ({
        url: `/api/workouts/cardio/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Incompleted", "Completed"],
    }),
    updateCardioWorkouts: builder.mutation({
      query: (data) => {
        return {
          url: `/api/workouts/cardio/${data.workoutId}`,
          method: "PUT",
          body: data.update,
        };
      },
      invalidatesTags: [
        "Incompleted",
        "Completed",
        "CardioDetails",
        "CardioVideos",
      ],
    }),
    // ########################################################################################
    createStrengthWorkouts: builder.mutation({
      query: (body) => {
        return {
          url: "/api/workouts/strength/",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Incompleted", "Completed"],
    }),
    getStrengthWorkoutDetails: builder.query({
      query: (id) => `/api/workouts/strength/${id}/`,
      providesTags: ["StrengthDetails"],
    }),
    deleteStrengthWorkout: builder.mutation({
      query: (id) => ({
        url: `/api/workouts/strength/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Incompleted", "Completed"],
    }),
    updateStrengthWorkouts: builder.mutation({
      query: (data) => {
        return {
          url: `/api/workouts/strength/${data.workoutId}`,
          method: "PUT",
          body: data.newData,
        };
      },
      invalidatesTags: [
        "Incompleted",
        "Completed",
        "StrengthDetails",
        "StrengthVideos",
      ],
    }),
    fetchStrengthApi: builder.query({
      query: (muscle) => `/api/exercise/strength/${muscle}`,
      providesTags: ["Exercises"],
    }),
    fetchEmbeddedString: builder.query({
      query: (search) => `/api/youtube/cardio/${search}`,
      providesTags: ["CardioVideos"],
    }),
    fetchEmbeddedList: builder.query({
      query: (search) => `/api/youtube/strength/${search}`,
      providesTags: ["StrengthVideos"],
    }),
  }),
});

export const {
  useGetAccountQuery,
  useLogoutMutation,
  useLoginMutation,
  useSignupMutation,
  useCreateCardioWorkoutsMutation,
  useGetCompletedWorkoutsQuery,
  useGetIncompletedWorkoutsQuery,
  useGetCardioWorkoutDetailsQuery,
  useDeleteCardioWorkoutMutation,
  useUpdateCardioWorkoutsMutation,
  useCreateStrengthWorkoutsMutation,
  useGetStrengthWorkoutDetailsQuery,
  useDeleteStrengthWorkoutMutation,
  useUpdateStrengthWorkoutsMutation,
  useFetchStrengthApiQuery,
  useFetchEmbeddedStringQuery,
  useFetchEmbeddedListQuery,
} = workoutApi;
