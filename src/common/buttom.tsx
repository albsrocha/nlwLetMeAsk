import {ButtonHTMLAttributes} from 'react'
import '../style/Button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;


export function Button(props:ButtonProps){

    return (

     <button className="button" {...props} />
    
     )

}

