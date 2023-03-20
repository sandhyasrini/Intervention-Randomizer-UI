import React, { useState } from "react";
import Button from "../Button/Button";
import OpenModal from "../Modal/OpenModal";

interface Props {
    firstButtonName: string
    secondButtonName: string
}

function ButtonGroup({firstButtonName, secondButtonName}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
    
  return (
    <section className="relative mt-[6rem] flex flex-1 justify-end mx-10">
      <Button
        buttonName={firstButtonName}
        buttonStyle="outlined"
        handleModalState={handleOpen}
        modalState={open}
        buttonAction="Randomize" 
        isDisabled={false}
        buttonType="OutsideModal"
      />
      <Button
        buttonName={secondButtonName}
        buttonStyle="contained"
        handleModalState={handleOpen}
        modalState={open}
        buttonAction="Create"
        isDisabled={false}
        buttonType="OutsideModal"
      />
      <OpenModal open={open} handleClose={handleClose} />
    </section>
  );
}

export default ButtonGroup;
