import AccNavbar from '@/components/AccNavbar'

export default function AccountLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section className=' flex max-lg:px-4 max-lg:flex-col '>
            <AccNavbar />
            {children}
        </section>
        )
}