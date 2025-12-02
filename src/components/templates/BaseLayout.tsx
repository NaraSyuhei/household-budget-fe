import { Outlet } from 'react-router-dom'

import { Header } from '../organisms/Header'

export const BaseLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}
