import classes from "./../components/ProfilePage.module.css"
import dogImage from "./../assets/dog.jpeg";
import fondo from "./../assets/fondo.jfif";
import { useUser } from "@clerk/clerk-react";

 const ProfilePage = () =>{
  const { user } = useUser();
    return (

        <div className={classes.profileContainer}>
        {/* Banner de la parte superior del perfil */}
        <div className={classes.profileBanner}>
          <img
            src={fondo}
            alt="Banner"
            className={classes.bannerImage}
          />
        </div>
  
        {/* Sección principal del perfil */}
        <div className={classes.profileMain}>
          {/* Avatar y nombre de usuario */}
          <div className={classes.profileInfo}>
            <img
              src={user?.imageUrl||dogImage}
              alt="Avatar"
              className={classes.avatar}
            />
            <h2>{user?.firstName} {user?.lastName }</h2>
            <p>{user?.primaryEmailAddress?.emailAddress} </p>
          </div>
  
          {/* Biografía */}
          <div className={classes.profileBio}>
            <h3>Bio</h3>
            <p>
              Full Stack Developer. Tech Enthusiast. I love coding, coffee, and
              open-source projects. Follow me for insights on React, JavaScript,
              and Web Development!
            </p>
          </div>
  
          {/* Estadísticas de usuario */}
          <div className={classes.profileStats}>
            <div>
              <h3>100</h3>
              <p>Posts</p>
            </div>
            <div>
              <h3>500</h3>
              <p>Followers</p>
            </div>
            <div>
              <h3>200</h3>
              <p>Following</p>
            </div>
          </div>
  
          {/* Botones de acción */}
          <div className={classes.profileActions}>
            <button className={classes.btn}>Follow</button>
            <button className={classes.btn}>Message</button>
          </div>
        </div>
      </div>
    


    )
}

export default ProfilePage;