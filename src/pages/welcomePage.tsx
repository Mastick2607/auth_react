import dogImage from "./../assets/dog.jpeg";
import classes from "./../components/welcomePage.module.css"
import { useUser } from "@clerk/clerk-react";
export const WelcomePage = () =>{
  const { user } = useUser();

    return(

        <main className={classes.welcomeContainer}>
        <img
          src={user?.imageUrl||dogImage}
          alt="Welcome Image"
          className={classes.welcomeImage}
        />
        <h1  className={classes.title}> {user?.firstName ? `Welcome to the page, ${user.firstName}.` : "Welcome to the page"}</h1>
        <p className={classes.description}>Take a look at the page.</p>
      </main>
    )
}

// export default WelcomePage;