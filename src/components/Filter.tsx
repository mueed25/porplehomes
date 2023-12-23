import MaxWidthWrapper from "./MaxWidthWrapper"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const Filter = () => {
  return (
    <MaxWidthWrapper>
        <div className="mt-2 shadow-xl rounded-2xl py-2">
            <form className=" flex max-md:flex-col">
                <div className="grid md:grid-cols-3 md:gap-4 px-4 w-full">
                <div className="flex ">
                    <div className="w-full">
                    <Label htmlFor="Budget">Cities</Label>
                    <Input type="text" className="md:border-0 " placeholder="All Cities"/>
                    </div>
                    <div className="flex items-end max-md:hidden">
                    <span
                      className='h-8 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                    </div>
                </div >
                <div className="flex max-md:my-2">
                    <div className="w-full">
                    <Label htmlFor="Budget">Property Size</Label>
                    <Input type="text" className="md:border-0 " placeholder="Bedrooms"/>
                    </div>
                    <div className="flex items-end max-md:hidden">
                    <span
                      className='h-8 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                    </div>
                </div >
                <div className="flex ">
                    <div className="w-full">
                    <Label htmlFor="Budget">Budget</Label>
                    <Input type="text" className="md:border-0 " placeholder="Max. Prices"/>
                    </div>
                    <div className="flex items-end max-md:hidden">
                    <span
                      className='h-8 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                    </div>
                </div >
                </div>
                <div className="flex justify-end items-end  max-md:w-full px-2 max-md:px-4 max-md:mt-2">
                <Button className="max-md:w-full">Filter</Button>
                </div>
            </form>
        </div>
    </MaxWidthWrapper>
  )
}

export default Filter