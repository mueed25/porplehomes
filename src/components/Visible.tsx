'use client'
import { useState } from 'react'
import {Eye, EyeOff} from 'lucide-react'

// interface Types {
//     balance: number;
//   }

const Visible =  (
    Types: {balance: number}
) => {

    const [visibility, setvisibility] = useState(true)


    return (
        <div>
            {visibility? <h2 className='font-bold'>NGN {Types.balance}</h2>: '*****'}
            
            <div className='justify-center flex items-center'>
            {visibility? <div onClick={ () => {
                setvisibility(prevValue => {
                    return !prevValue
                })
            }}><Eye /></div> : <div onClick={ () => {
                setvisibility( prevValue => {
                    return !prevValue
                })
            }
            }><EyeOff /></div>
            }
            </div>
        </div>
    ) 
}

export default Visible