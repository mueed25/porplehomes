import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { DataTable } from '@/components/DataTable'
import { columns } from '@/components/Column'
import { getServerSideUser } from '@/lib/payload.utils'
import { cookies } from 'next/headers'

const page = async () => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }
  
  const payments: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    
  ]

  
  return (
    <MaxWidthWrapper>
      {user? (
        <div className=' pt-4 px-4'>
            <section className='flex justify-between'>
              <div className=''>
                  <p>Hello {user?.email}</p>
                  <h3 className=' font-bold'>Wellcome Back!</h3>
              </div>
              <div className='flex border rounded-lg shadow-sm px-3 max-sm:hidden'>
                <span className='flex justify-center items-center'>
                  <Search />
                  </span>
                <Input type='text' className='border-0 outline-none' placeholder='Search related documents..'/>
              </div>
            </section>
            <section>
              <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-5 pt-8'>
                <div className='flex border'>
                  <div></div>
                </div>
                <div><DataTable columns={columns} data={payments} /></div>
                <div><DataTable columns={columns} data={payments} /></div>
                <div><DataTable columns={columns} data={payments} /></div>
              </div>
            </section>
        </div>
        ): null}
    </MaxWidthWrapper>
    
  )
}

export default page