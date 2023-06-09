import React from 'react'
import MaterialButton from '@mui/material/Button'
import { useAppDispatch } from '../../store/store'
import { changeHeading } from '../../store/slices/modalSlice'

interface Props {
  buttonName: string
  buttonStyle?: 'text' | 'outlined' | 'contained' | undefined
  buttonAction?: 'Create' | 'Edit' | 'Randomize'
  buttonType?: 'InsideModal' | 'OutsideModal'
  handleModalState?: (
    e: React.MouseEvent<HTMLButtonElement>,
    isOpen: boolean
  ) => void
  modalState?: boolean
  isDisabled?: boolean
}

function Button ({
  buttonName,
  buttonStyle,
  handleModalState,
  modalState,
  buttonAction,
  isDisabled
}: Props): JSX.Element {
  const dispatch = useAppDispatch()
  function handleClick (e: React.MouseEvent<HTMLButtonElement>): void {
    (buttonAction !== undefined) &&
      dispatch(
        changeHeading({ heading: buttonName, modalAction: buttonAction })
      )
    handleModalState(e, !modalState)
  }

  return (
    <div className='px-1'>
      <MaterialButton
        className='font-calibre'
        disabled={isDisabled}
        onClick={handleClick}
        variant={buttonStyle}
        disableRipple
      >
        {buttonName}
      </MaterialButton>
    </div>
  )
}

const MemoizedButton = React.memo(Button)

export default MemoizedButton
