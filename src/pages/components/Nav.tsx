'use client'
import React, { useState, useEffect } from 'react'
import SVGComponent from './SVGComponent'
import Link from 'next/link'
import NavDesktop from './Nav/Desktop/NavDesktop'
import NavMobile from './Nav/Mobile/NavMobile'
import { useAppSelector } from '@/lib/store/store'
import { selectAuth } from '@/lib/store/features/auth/authSlice'

export default function Nav() {
  const [windowWidth, setWindowWidth] = useState(0)
  const [navComponent, setNavComponent] = useState<JSX.Element>()
  const user = useAppSelector(selectAuth)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth)
      }

      handleResize()

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  useEffect(() => {
    windowWidth >= 900
      ? setNavComponent(<NavDesktop isLoggedIn={user.isLoggedIn} />)
      : setNavComponent(<NavMobile isLoggedIn={user.isLoggedIn} />)
  }, [windowWidth])

  return (
    <div className='flex justify-between p-4 text-xl items-center relative z-50'>
      <h1 className='sr-only'>Artemis</h1>
      <Link
        href='/'
        className='mx-3 w-48 min-w-[150px] md:min-w-[192px]'>
        <SVGComponent
          url={'/images/artemis_logo.svg'}
          alt={'Artemis logo with a cat sitting on the right'}
          width={206}
          height={41}
        />
      </Link>
      {navComponent}
    </div>
  )
}
