'use client'
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'

const ShowNavbar = ({children} : {
    children: React.ReactNode
  }) => {

    const noNav = ['/account' ,'/account/Communication/Inbox', '/account/Overview', '/account/People', '/account/People/NewTenant','/account/Communication/Compose', '/account/Residentials', '/account/Accounting', '/', '/account/Communication'] 
    const pathname = usePathname()

  return (
    <div>
        {noNav.includes(pathname)  ? null : (
            <>{children}</>)}
    </div>
  )
}

export default ShowNavbar