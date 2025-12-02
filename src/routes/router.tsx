import { Route, Routes } from 'react-router-dom'

import { BaseLayout } from '@/components/templates/BaseLayout'

import { HomeRootContainer } from '../features/Home/Root/HomeRootContainer'

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path='*' element={<HomeRootContainer />} />
      </Route>
    </Routes>
  )
}
