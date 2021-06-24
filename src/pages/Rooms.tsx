import logoImg from '../assets/images/logo.svg'
import { Button } from '../common/buttom'
import '../style/rooms.scss'
import {RoomCode} from '../pages/RoomCode'
import {useParams} from 'react-router-dom'
import { FormEvent, useState,useContext } from 'react'
import {AuthContext} from '../contexts/AuthContexts'



type RoomParams ={
    id : string
}
type TextoArea ={
    Texto : string
}
export function Rooms(){

        const {user, signWithGoogle} = useContext(AuthContext)

        const params = useParams<RoomParams>()
        const roomId = params.id

        const [newText, setnewText] = useState('')

        const question ={
            content : newText,
            author: {
                name : user?.name,
                avatar: user?.avatar
            },
            isHighlight : false,
            isAnswred : false,

        }

        async function handleSendQuestion(event : FormEvent){
            event.preventDefault()

            if(newText.trim() ===' ') {
                return ;
            }

            if(!user){
                throw new Error('Precisa estar logado')
            }
        }

    return(
        <div id='page-room'>
            <header>
                <div className="content">
                    <img src={logoImg}/>
                    <RoomCode code={params.id} />
                </div>
         </header>

         <div id="main">
             <div className="room-title">
                 <h1>Sala React</h1>
                 <span>5 perguntas</span>
             </div>

             <form onSubmit={handleSendQuestion}>
                 <textarea
                 placeholder="O que você quer perguntar?"
                 onChange ={event =>setnewText(event.target.value)}
                 value = {newText}
                 />
                 <div className="form-footer">
                     <span>Para enviar uma pergunta  <button>faça seu login</button></span>
                     <Button>Enviar Pergunta</Button>
                 </div>
             </form>
         </div>
        </div>
    )
}