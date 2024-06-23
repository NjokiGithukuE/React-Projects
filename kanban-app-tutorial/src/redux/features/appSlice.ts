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

//   const initialState = {
//     //add and edit tasks modal state
//     isAddAndEditTaskModal: { isOpen: false, variant: "", title: "", index: -1, name: ""},
//     };

const initialState = {
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
  },
});
export const {
  setCurrentBoardName,
  openAddAndEditBoardModal,
  closeAddAndEditBoardModal,
  openDeleteBoardAndTaskModal,
  closeDeleteBoardAndTaskModal,
} = features.actions;

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
 