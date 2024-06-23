import { Modal, ModalBody } from "./Modal";
   import { useAppDispatch, useAppSelector } from "@/components/redux/hooks";
   import {
   closeDeleteBoardAndTaskModal,
   getDeleteBoardAndTaskModalValue,
   getDeleteBoardAndTaskModalVariantValue,
   getDeleteBoardAndTaskModalTitle,
   getDeleteBoardAndTaskModalIndex,
   getDeleteBoardAndTaskModalStatus,
   getCurrentBoardName,
   } from "@/components/redux/features/appSlice";
   import {
   useFetchDataFromDbQuery,
   useUpdateBoardToDbMutation,
   } from "@/components/redux/services/apiSlice";
   
   export default function DeleteBoardAndTaskModal() {
    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(getDeleteBoardAndTaskModalValue);
    const closeModal = () => dispatch(closeDeleteBoardAndTaskModal());
    const currentBoardName = useAppSelector(getCurrentBoardName);
    const modalVariant = useAppSelector(getDeleteBoardAndTaskModalVariantValue);
    const taskTitle = useAppSelector(getDeleteBoardAndTaskModalTitle);
    const taskIndex = useAppSelector(getDeleteBoardAndTaskModalIndex);
    const taskStatus = useAppSelector(getDeleteBoardAndTaskModalStatus);
    let { data } = useFetchDataFromDbQuery();
    const [updateBoardToDb, { isLoading }] = useUpdateBoardToDbMutation();
   }