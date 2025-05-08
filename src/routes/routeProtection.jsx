import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("TokenId");



  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const RedirectedRouteForLogin = ({children}) =>{
  const token = localStorage.getItem("TokenId");

  if(token){
    const user= localStorage.getItem("User");
    if(user){
      const jsonUser= JSON.parse(user);
     
      if(!jsonUser.profile){
        return <Navigate to="/createProfile" replace />
      }
      return <Navigate to="/employerHome/jobs" replace />
    }
  }

  return children
}


export const RedirectedRoute =({children}) =>{
  const token = localStorage.getItem("TokenId");

  if(token){
    const user= localStorage.getItem("User");
    if(user){
      const jsonUser= JSON.parse(user);
     
      if(!jsonUser.profile){
        return children
      }
      return <Navigate to="/employerHome/jobs" replace />
    }
  }

  return <Navigate to="/" replace />
}


export const RedirectedRouteForHome =({children}) =>{
  const token = localStorage.getItem("TokenId");

  if(token){
    const user= localStorage.getItem("User");
    if(user){
      const jsonUser= JSON.parse(user);
     
      if(!jsonUser.profile){
        return <Navigate to="/createProfile" replace />
      }
      return children
    }
  }

  return <Navigate to="/" replace />
}