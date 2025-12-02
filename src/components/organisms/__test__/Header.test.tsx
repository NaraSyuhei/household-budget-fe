import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { customRender } from '@/tests/helpers/customRender'

import { Header } from '../Header'

describe('Header', () => {
  describe('正常系', () => {
    it('ヘッダーが表示されること', async () => {
      customRender(<Header />)

      expect(screen.getByRole('heading', { name: 'HOUSEHOLD BUDGET APP' })).toBeInTheDocument()
    })
  })
})
