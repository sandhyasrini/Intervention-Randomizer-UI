import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModalForm from "./ModalForm";
import ModalList from "./ModalList";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Button from "../Button/Button";
import { developer } from "../../store/slices/developerSlice";
import {
  addDeveloperToDatabase,
  editDeveloper,
} from "../../store/actions/developerAction";
import { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

function OpenModal({ open, handleClose }: Props): JSX.Element {
  const [details, setDetails] = useState<developer>();
  const [formFilled, setFormFilled] = useState(false);
  const [isDropDownVisible, setDropdownVisibility] = useState(true);

    const getAllState = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setDetails(
      getAllState.modal.modalAction === "Edit" &&
        (getAllState.developer.selectedDeveloper as developer)
    );
  }, [getAllState]);

  const addDetails = useCallback((
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string> | null,
    label: string
  ) => {
    e.target.value !== "" &&
      setDetails({ ...details, [e.target?.name]: e.target.value });
  }, [details])

  function onSubmitForm(
    e: React.MouseEvent<HTMLButtonElement> | null,
    isOpen: boolean
  ) {
    if (getAllState.modal.modalAction !== "Randomize") {
      getAllState.modal.modalAction === "Edit"
        ? dispatch(editDeveloper(details as developer))
        : dispatch(
            addDeveloperToDatabase({
              ...details,
              id: getAllState.developer.developers.length + 1,
            } as developer)
          );
    }
    setDropdownVisibility(true)
    handleClose(isOpen);
  }

  function onSubmitRandomizeForm() {
    setDropdownVisibility(false);
  }

  function onCloseModal(
    e: React.MouseEvent<HTMLButtonElement> | null,
    isOpen: boolean
  ) {
    setDropdownVisibility(true)
    handleClose(isOpen);
  }

  return (
    <section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {getAllState.modal.heading}
          </Typography>
          <Typography
            component={"div"}
            id="modal-modal-description"
            sx={{ mt: 2 }}
            className="m-10"
          >
            {(getAllState.modal.modalAction === "Edit" ||
              getAllState.modal.modalAction === "Create") && (
              <ModalForm
                captureChange={addDetails}
                checkFormFilled={setFormFilled}
              />
            )}
            {getAllState.modal.modalAction === "Randomize" && (
              <ModalList
                onSubmitForm={onSubmitRandomizeForm}
                isDropdownVisible={isDropDownVisible}
              />
            )}
          </Typography>
          {(getAllState.modal.modalAction === "Edit" ||
            getAllState.modal.modalAction === "Create" ||
            !isDropDownVisible) && (
            <section className="flex flex-1">
              <Button
                buttonName="Cancel"
                handleModalState={onCloseModal}
                modalState={open}
                buttonStyle="outlined"
                isDisabled={false}
                buttonType="InsideModal"
              />
              <Button
                buttonName="Done"
                handleModalState={onSubmitForm}
                modalState={open}
                buttonStyle="contained"
                isDisabled={
                  getAllState.modal.modalAction === "Randomize"
                    ? false
                    : !formFilled
                }
                buttonType="InsideModal"
              />
            </section>
          )}
        </Box>
      </Modal>
    </section>
  );
}

export default OpenModal;
