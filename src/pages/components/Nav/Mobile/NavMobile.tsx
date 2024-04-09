'use client'
import React, { useEffect, useState } from 'react'
import NotificationMenu from '../../NotificationMenu'
import UserMenuMobile from './UserMenuMobile'
import MenuMobile from './MenuMobile'

export default function NavMobile({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [menuComponent, setMenuComponent] = useState<JSX.Element>()

  useEffect(() => {
    if (isLoggedIn) {
      setMenuComponent(
        <>
          <NotificationMenu />
          <UserMenuMobile />
        </>
      )
    } else {
      setMenuComponent(<MenuMobile />)
    }
  })
  return <nav className='flex'>{menuComponent}</nav>
}
