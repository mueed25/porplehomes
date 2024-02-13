import AccNavbar from '@/components/AccNavbar'
import Announce from '@/components/Announce'
import { getServerSideUser } from '@/lib/payload.utils'
import { cookies } from 'next/headers'


export default function AccountLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    
    return (
        <section className=' flex max-lg:px-2 flex-col w-full '>
            <Announce />
            {children}
        </section>
        )
}