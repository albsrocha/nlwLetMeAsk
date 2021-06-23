import illustratiomImg from '../assets/images/illustration.svg'
import Logo from '../assets/images/logo.svg'
import googleLogo from '../assets/images/google-icon.svg'
import '../style/auth.scss'
import {Button} from '../common/buttom'
import {AuthContext} from '../contexts/AuthContexts'
import {useHistory} from'react-router-dom' 

import { FormEvent, useContext, useState } from 'react'
import {database} from '../services/firebase'
import { idText } from 'typescript'

export function Home(){

    const history = useHistory()

    const {user, signWithGoogle} = useContext(AuthContext)

    const [roomCode,setRoomCode] = useState('')

   async function handleCreateRoom(){

         if (!user){
            await  signWithGoogle()
        }    
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event : FormEvent){
        event.preventDefault()
    
        if (roomCode.trim()===""){
            return ;
        }
        const sala = '/rooms/'+ roomCode
        const roomRef = await database.ref(sala).get();
        
        if(!roomRef.exists()){
            alert('A Sala não existe') 
            return;
        }
        history.push(sala)
    }

    return (
        <div id="page-auth">
              <aside>

                <img  src={illustratiomImg} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong> Crie Salas de Q&amp;A ao-vivo</strong>
                <p> Tire dúvidas da sua audiência em tempo real!</p>
             </aside>

   

        <main>
                  <div className="main-content">

                        <img  src={Logo} alt="Logo do Q&amp;A"/>

                        <button className="create-room" onClick={handleCreateRoom}> 

                            <img src={googleLogo} alt="Google Logo"/>        
                            Crie sua Sala com Google

                        </button>

                        <div className="separator">ou entre em uma sala</div>

                        <form onSubmit={handleJoinRoom}> 

                            <input 
                             type="text" 
                             placeholder="Insira o código da sala." 
                             onChange ={event => setRoomCode(event.target.value)}
                             value = {roomCode}
                             />

                            <Button type="submit">Entrar na sala.</Button>

                        </form>


                    </div>

                </main>

        </div>

    )
}