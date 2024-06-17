'use client'
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { Button } from "./ui/button"


const AllButtons = ({
  children,
  className
}: {
  children: ReactNode,
  className?: string
}) => {


  return (
    <Button className={cn('', className)}>
        {children}
    </Button>
  )
}

export default AllButtons