import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Box } from '@chakra-ui/react'

import styles from './MonthYearPicker.module.css'

interface MonthYearPickerProps {
  targetDate: Date
  onChangeDate: (date: Date) => void
}

export const MonthYearPicker = ({ targetDate, onChangeDate }: MonthYearPickerProps) => {
  return (
    <>
      <Box>
        <DatePicker
          showMonthYearPicker
          selected={targetDate}
          onChange={(selectedDate: Date | null) => {
            if (selectedDate) {
              onChangeDate(selectedDate)
            }
          }}
          dateFormat='yyyy / MM'
          className={styles['month-year-input']}
        />
      </Box>
    </>
  )
}
