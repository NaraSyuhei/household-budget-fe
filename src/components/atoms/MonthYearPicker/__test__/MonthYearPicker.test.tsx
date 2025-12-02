import { screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import { customRender } from '@/tests/helpers/customRender'

import { MonthYearPicker } from '../MonthYearPicker'

describe('MonthYearPicker', () => {
  describe('正常系', () => {
    it('月毎に表示され,クリック時にonChangeDateが呼ばれること', async () => {
      const monthYearPickerProps = {
        targetDate: new Date('2024-05-01'),
        onChangeDate: vi.fn(),
      }

      customRender(
        <MonthYearPicker
          targetDate={monthYearPickerProps.targetDate}
          onChangeDate={monthYearPickerProps.onChangeDate}
        />,
      )

      expect(screen.getByDisplayValue('2024 / 05')).toBeInTheDocument()
      
    })
  })
})
