import { ReactNode } from "react"
import MainNavigation from "./MainNavigation";

type Props ={

children: ReactNode

}



const  RootLayout = (props:Props)=>{

 const {children} = props;

  return (
    <>
    <MainNavigation/>
    <br />
    <br />
   
    <main>{children}</main>
 </>


  )


}
export default RootLayout