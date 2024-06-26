import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const fireStoreApi = createApi({
  reducerPath: "firestoreApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    fetchDataFromDb: builder.query<{ [key: string]: any }[], void>({
      async queryFn() {
        try {
          const session = await getSession();
          if (session?.user) {
            const { user } = session;
            const ref = collection(db, `users/${user.email}/tasks`);
            const querySnapshot = await getDocs(ref);
            return { data: querySnapshot.docs.map((doc) => doc.data()) };
          }
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: ["Tasks"],
    }),
    // endpoint for CRUD actions
    updateBoardToDb: builder.mutation({
      async queryFn(boardData) {
        try {
          const session = await getSession();
          if (session?.user) {
            const { user } = session;
            const ref = collection(db, `users/${user.email}/tasks`);
            const querySnapshot = await getDocs(ref);
            const boardId = querySnapshot.docs.map((doc) => {
              return doc.id;
            });
            await updateDoc(doc(db, `users/${user.email}/tasks/${boardId}`), {
              boards: boardData,
            });
          }
          return { data: null };
        } catch (e) {
          return { error: e };
        }
      },
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useFetchDataFromDbQuery, useUpdateBoardToDbMutation } =
  fireStoreApi;

const initialState = {
  currentBoardName: "",
  // Manage the state for opening and closing the Add and Edit Board modal
  isAddAndEditBoardModal: { isOpen: false, variant: "" },
  //add and edit tasks modal state
  isAddAndEditTaskModal: {
    isOpen: false,
    variant: "",
    title: "",
    index: -1,
    name: "",
  },
  isDeleteBoardAndTaskModal: {
    isOpen: false,
    variant: "",
    title: "",
    status: "",
    index: -1,
  },
};

export const features = createSlice({
  name: "features",
  initialState,

  reducers: {
    setCurrentBoardName: (state, action: PayloadAction<string>) => {
      state.currentBoardName = action.payload;
    },

    // Open the delete board and task modal with a specified variant (delete board or task)
    openDeleteBoardAndTaskModal: (state, { payload }) => {
      state.isDeleteBoardAndTaskModal.isOpen = true;
      state.isDeleteBoardAndTaskModal.variant = payload.variant;
      state.isDeleteBoardAndTaskModal.title = payload.title;
      state.isDeleteBoardAndTaskModal.status = payload.status;
      state.isDeleteBoardAndTaskModal.index = payload.index;
    },
    // Close the delete board and task modal
    closeDeleteBoardAndTaskModal: (state) => {
      state.isDeleteBoardAndTaskModal.isOpen = false;
      state.isDeleteBoardAndTaskModal.variant = "";
      state.isDeleteBoardAndTaskModal.title = "";
      state.isDeleteBoardAndTaskModal.status = "";
      state.isDeleteBoardAndTaskModal.index = -1;
    },
    // Open the Add and Edit Board modal with a specified variant (add or edit)
    openAddAndEditBoardModal: (state, { payload }) => {
      state.isAddAndEditBoardModal.isOpen = true;
      // Set the kind of modal to open (add board or edit board) based on the variant parameter
      state.isAddAndEditBoardModal.variant = payload;
    },
    // Close the Add and Edit Board modal
    closeAddAndEditBoardModal: (state) => {
      state.isAddAndEditBoardModal.isOpen = false;
      state.isAddAndEditBoardModal.variant = "";
    },
    // Open the Add and Edit task modal with a specified variant (add or edit), title, description, status
    openAddAndEditTaskModal: (state, { payload }) => {
      state.isAddAndEditTaskModal.isOpen = true;
      state.isAddAndEditTaskModal.variant = payload.variant;
      state.isAddAndEditTaskModal.title = payload.title;
      state.isAddAndEditTaskModal.index = payload.index;
      state.isAddAndEditTaskModal.name = payload.name;
    },
    // Close the Add and Edit task modal
    closeAddAndEditTaskModal: (state) => {
      state.isAddAndEditTaskModal.isOpen = false;
      state.isAddAndEditTaskModal.variant = "";
      state.isAddAndEditTaskModal.title = "";
      state.isAddAndEditTaskModal.index = 0;
      state.isAddAndEditTaskModal.name = "";
    },
  },
});
export const {
  setCurrentBoardName,
  openAddAndEditBoardModal,
  closeAddAndEditBoardModal,
  openDeleteBoardAndTaskModal,
  closeDeleteBoardAndTaskModal,
  openAddAndEditTaskModal,
  closeAddAndEditTaskModal,
} = features.actions;

// Selector function to retrieve isOpen state value
export const getAddAndEditTaskModalValue = (state: RootState) =>
  state.features.isAddAndEditTaskModal.isOpen;
// Selector function to retrieve variant state value
export const getAddAndEditTaskModalVariantValue = (state: RootState) =>
  state.features.isAddAndEditTaskModal.variant;
// Selector function to retrieve title state value
export const getAddAndEditTaskModalTitle = (state: RootState) =>
  state.features.isAddAndEditTaskModal.title;
// Selector function to retrieve index state value
export const getAddAndEditTaskModalIndex = (state: RootState) =>
  state.features.isAddAndEditTaskModal.index;
// Selector function to retrieve name state value
export const getAddAndEditTaskModalName = (state: RootState) =>
  state.features.isAddAndEditTaskModal.name;
// Delete task and board
export const getDeleteBoardAndTaskModalValue = (state: RootState) =>
  state.features.isDeleteBoardAndTaskModal.isOpen;
// Selector function to retrieve variant state value
export const getDeleteBoardAndTaskModalVariantValue = (state: RootState) =>
  state.features.isDeleteBoardAndTaskModal.variant;
// Selector function to retrieve title state value
export const getDeleteBoardAndTaskModalTitle = (state: RootState) =>
  state.features.isDeleteBoardAndTaskModal.title;
// Selector function to retrieve status state value
export const getDeleteBoardAndTaskModalStatus = (state: RootState) =>
  state.features.isDeleteBoardAndTaskModal.status;
// Selector function to retrieve index state value
export const getDeleteBoardAndTaskModalIndex = (state: RootState) =>
  state.features.isDeleteBoardAndTaskModal.index;
export const getCurrentBoardName = (state: RootState) =>
  state.features.currentBoardName;
// Selector functions to retrieve isOpen value of state from the isAddAndRditBoardModal state
export const getAddAndEditBoardModalValue = (state: RootState) =>
  state.features.isAddAndEditBoardModal.isOpen;
// Selector functions to retrieve isOpen value of state from the isAddAndRditBoardModal state
export const getAddAndEditBoardModalVariantValue = (state: RootState) =>
  state.features.isAddAndEditBoardModal.variant;
// Export the reducer for use in the Redux store
export default features.reducer;
