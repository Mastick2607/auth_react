import { useClerk, UserButton, useSession } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export function SignInButton() {
  const clerk = useClerk();

  return (
    <Button
      onClick={() => clerk.openSignIn({})}
      bg={"blue.400"}
      color={"white"}
      _hover={{
        bg: "blue.500",
      }}
    >
      SignIn
    </Button>
  );
}

const MainNavigation = () => {
  const { session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={classes.nav}>
      <div className={classes.logo}>My App</div>

      <button className={classes.mobileMenuButton} onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      <ul
        className={`${classes.navLinks} ${
          isMobileMenuOpen ? classes.showMenu : ""
        }`}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Blog
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            API
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Profile
          </NavLink>
        </li>

        <li>{session ? <UserButton /> : <SignInButton />}</li>
      </ul>
    </nav>
  );
};

export default MainNavigation;






// import {  useClerk, UserButton, useSession } from "@clerk/clerk-react";
// import { NavLink } from "react-router-dom";
// import classes from "./MainNavigation.module.css";
// import { Button } from "@chakra-ui/react";

// export function SignInButton(){

//     const clerk = useClerk();

//     return(
// <Button onClick={()=>clerk.openSignIn({})} bg={'blue.400'}
//    color={'white'}_hover={{

//     bg:'blue.500'
//    }}
// >

// SignIn
// </Button>

//     )
// }


// const MainNavigation = () => {
//   const { session } =  useSession();

//   return (
//     <nav>
//       <ul>
//         <li>
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive ? classes.active : undefined
//             }
//             end
//           >Home</NavLink>
//         </li>
    

//         <li>
//           <NavLink
//             to="/invoices"
//             className={({ isActive }) =>
//               isActive ? classes.active : undefined
//             }
//             end
//           >Invoices</NavLink>
//         </li>

//         <li>
//           <NavLink
//             to="/expenses"
//             className={({ isActive }) =>
//               isActive ? classes.active : undefined
//             }
//             end
//           >Expenses</NavLink>
//         </li>

//         <li>
//           <NavLink
//             to="/profile"
//             className={({ isActive }) =>
//               isActive ? classes.active : undefined
//             }
//             end
//           >Profile</NavLink>
//         </li>
//         {session ?( <UserButton/>):(<SignInButton/>)}
//       </ul>
//     </nav>
//   );
// };

// export default MainNavigation
