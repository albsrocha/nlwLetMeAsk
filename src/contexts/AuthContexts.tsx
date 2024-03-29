import {createContext, ReactNode, useState, useEffect} from 'react'
import {auth, firebase } from '../services/firebase'

type User ={

    id : string;
    name :string ; 
    avatar: string
    }
    
   
 type AuthContextType ={
    user: User | undefined; 
    signWithGoogle: ()=> Promise<void>;
    }
    
  type AuthContextProps ={
    children :ReactNode;
  }

export const AuthContext = createContext({} as AuthContextType) 

export function AuthContextProvider(props: AuthContextProps){

  const [user, setUser] = useState<User>()

  useEffect( ()=>{
    const unsubscribe = auth.onAuthStateChanged( user =>{
       if(user){

        const {displayName, photoURL, uid} = user


        if(!displayName || !photoURL){
        
        throw new Error('Missing information from Google Account')
        
        }
        
        setUser({
              
              id:uid,
              
              name:displayName,
              
              avatar:photoURL
        
        })
      }
    } )
    return () =>{unsubscribe () } 
  }, [])


     async function signWithGoogle (){

        const provider = new firebase.auth.GoogleAuthProvider()

        const result = await auth.signInWithPopup(provider)

            if(result.user){
               const {displayName, photoURL, uid} = result.user

                   if(!displayName || !photoURL){
                       throw new Error('Missing information from Google Account')
                        }
                        setUser({
                          id:uid,
                          name:displayName,
                          avatar:photoURL
                        })
            }
      }
  
return(
  <AuthContext.Provider value={{user, signWithGoogle}}>
        {props.children}
  </AuthContext.Provider>
);
  
}
