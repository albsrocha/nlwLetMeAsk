import illustratiomImg from '../assets/images/illustration.svg'
import Logo from '../assets/images/logo.svg'
import '../style/auth.scss'
import {Button} from '../common/buttom'
import {Link, useHistory} from 'react-router-dom'
import { useContext, FormEvent, useState } from 'react'
import { AuthContext } from '../contexts/AuthContexts'
import {database} from '../services/firebase'


export function NewRoom(){

    const {user, signWithGoogle} = useContext(AuthContext)

    const [newRoom, setNewRoom] = useState('');

    const history = useHistory()

    async function handleNewRoom(event : FormEvent){
     event.preventDefault()

        if(newRoom.trim()==='') {
            return ;
        }

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })
       
        const siteRoom = '/rooms/' + firebaseRoom.key
        history.push(siteRoom)
    }


    return (

        <div id="page-auth">
              <aside>
                <img  src={illustratiomImg} alt="IIlustração simbolizando perguntas e respostas"/>
                <strong> Crie Salas de Q&amp;A ao-vivo</strong>
                <p> Tire dúvidas da sua audiência em tempo real!</p>
             </aside>

   

        <main>
                  <div className="main-content">

                        <h1>{user?.name}</h1>
                        <img  src={Logo} alt="Logo do Q&amp;A"/>

                        <h2>Criar uma nova Sala</h2> 

                        <form onSubmit={handleNewRoom}>

                            <input 
                             type="text" 
                             placeholder="Nome da sala." 
                             onChange = {event => setNewRoom(event.target.value)}
                             />

                            <Button type="submit">Criar sala.</Button>

                        </form>

                    <p>Quer entrar em uma sala existente? <Link to="/" >Clique Aqui</Link> </p> 

                    </div>

                </main>

        </div>

    )
}