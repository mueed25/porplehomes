'use client'

import { User } from '@/payload-types'
import { Button, buttonVariants } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { Menu} from 'lucide-react'
import { notFound, redirect } from 'next/navigation'



const UserAccountNav = ({ user }: { user: string  }) => {
  const { signOut } = useAuth()

  const signIn = () => {
    return redirect(
      `/sign-in?origin=/`
    )
  }

  const signUp = () => {
    return redirect(
      `/sign-up?origin=/`
    )
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='overflow-visible'>
        <Button
          variant='ghost'
          size='sm'
          className='relative'>
          <Menu className=''/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='bg-white w-60'
        align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='font-medium text-sm text-black'>
              {user == 'y'? 'User ': user}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/account'>Account</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/sell'>Seller Dashboard</Link>
        </DropdownMenuItem>

      {user? (
        <div>
        <DropdownMenuItem
        onClick={signIn}
        className='cursor-pointer'>
        <Link
            href='/sign-in'>
            Sign in
        </Link>
      </DropdownMenuItem>

        <DropdownMenuItem
        onClick={signUp}
        className='cursor-pointer'>
        <Link
            href='/sign-up'>
            Create Account
        </Link>
      </DropdownMenuItem>
      </div>
      ): (
        <DropdownMenuItem
          onClick={signOut}
          className='cursor-pointer'>
          Log out
        </DropdownMenuItem>
      )
      }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
