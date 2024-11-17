import { Spinner } from "@chakra-ui/react"
import { useSession } from "@clerk/clerk-react"
import {  ReactNode } from "react"
import { Navigate } from "react-router-dom"

type Props={

    children:ReactNode

}


export const ProtectedRute = (props:Props)=>{
  const {children} = props;
     const {isLoaded,session} = useSession(); 
      
     if(!isLoaded){
          return   <Spinner/>
        
     }
     if(!session?.user){
      return  <Navigate to={'/'}/>
     }

     return <>{children}</>
}