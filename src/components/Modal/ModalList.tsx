import { type SelectChangeEvent } from '@mui/material/Select'
import React, { useEffect, useState } from 'react'
import { type developer } from '../../store/slices/developerSlice'
import { useAppSelector } from '../../store/store'
import {
  findUniqueItems,
  getRandomNames,
  getSpeakerName
} from '../../utils/commonUtils'
import RandomizerForm from './RandomizerForm'
interface Props {
  onSubmitForm: () => void
  isDropdownVisible: boolean
  handleModalState: (
    e: React.MouseEvent<HTMLButtonElement>,
    isOpen: boolean
  ) => void
}
function ModalList ({ onSubmitForm, isDropdownVisible, handleModalState }: Props): JSX.Element {
  const developers = useAppSelector((state) => state.developer.developers)
  const [developerList, setDeveloperList] = useState<any[]>([])
  const [speaker, setSpeaker] = useState<any>()
  const [dropDownData, setDropDownData] = useState({
    developers: 'All Selected',
    sorting_order: 'Random',
    speaker: 'None'
  })

  useEffect(() => {
    const getSelectedDevelopers = findUniqueItems({
      arr: developers,
      searchItem: dropDownData.developers
    })
    setSpeaker(getSpeakerName(getSelectedDevelopers.length))

    const sortedList =
      getSelectedDevelopers.length > 5
        ? getRandomNames(getSelectedDevelopers, 5, dropDownData.sorting_order)
        : getRandomNames(getSelectedDevelopers, getSelectedDevelopers.length, dropDownData.sorting_order)
    setDeveloperList(sortedList)
  }, [developers, dropDownData])

  const onChange =
    (e: SelectChangeEvent<string>, label: string): void => {
      setDropDownData({ ...dropDownData, [label]: e.target.value })
    }

  return (
    <div>
      <RandomizerForm
        onChange={onChange}
        onSubmitForm={onSubmitForm}
        isDropdownVisible={isDropdownVisible}
        handleModalState={handleModalState}
      />
      {!isDropdownVisible && (
        <section>
          <span className='text-gray-500 text-[0.9rem]'>List Result:</span>
          <div className='flex flex-col m-4'>
            {developerList.map((developer: developer, index: number) => {
              return (
                <span className='py-3' key={index}>
                  {index + 1}
                  {'. '}
                  {developer.name}{' '}
                  {dropDownData.speaker === 'Assign Speaker' &&
                    index === speaker && (
                      <span className='text-gray-800 text-sm mx-3'>
                        default speaker
                      </span>
                  )}
                </span>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

export default ModalList
