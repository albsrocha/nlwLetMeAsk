import logoImg from '../assets/images/logo.svg'
import { Button } from '../common/buttom'
import '../style/rooms.scss'
import {RoomCode} from '../pages/RoomCode'
import {useParams} from 'react-router-dom'
import { FormEvent, useState,useContext, useEffect } from 'react'
import {AuthContext} from '../contexts/AuthContexts'
import { database } from '../services/firebase'
import { parse } from 'path'
import { setSyntheticLeadingComments } from 'typescript'

type FirebaseQuestions = Record<string,{
    author: {
    name: string,
    avatar: string,
},
content: string,
isHighlighted : boolean,
isAnswered : boolean
}>

type RoomParams ={
    id : string
}
type TextoArea ={
    Texto : string
}

type Questions  ={
    author: {
        name: string,
        avatar: string,
        },
        content: string,
        isHighlighted : boolean,
        isAnswered : boolean 
}

export function Rooms(){

        const {user, signWithGoogle} = useContext(AuthContext)

        const params = useParams<RoomParams>()
        const roomId = params.id

        const [newText, setnewText] = useState('')

        const [quest, setQuest] = useState<Questions[]>([])

        const [title, setTitulo] = useState("")

        const question ={
            content : newText,
            author: {
                name : user?.name,
                avatar: user?.avatar
            },
            isHighlighted : false,
            isAnswered : false,

        }
     
        async function handleSendQuestion(event : FormEvent){
            event.preventDefault()

            if(newText.trim() ===' ') {
                return ;
            }

            if(!user){
                throw new Error('Precisa estar logado')
            }
                  let locale = "rooms/" + roomId + "/questions"

                await    database.ref(locale).push(question)

                    setnewText('')

        }

   useEffect(()  =>{

    let local = "rooms/" + roomId 
    let localFinal = database.ref(local)

    localFinal.on('value' , room => {

        const dataB = room.val()
        const questionData : FirebaseQuestions  = dataB.questions ?? {}
        
        const parsedQuestions = Object.entries(questionData).map( ([key,valor])=>{
            return {
                key : key,
                author : valor.author,
                content : valor.content,
                isHighlighted: valor.isHighlighted,
                isAnswered : valor.isAnswered
            }   
            
        }  )
        setTitulo(dataB.title)
        setQuest(parsedQuestions)
    })

   }, [roomId])
         
    
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
                 <h1>Sala {title}</h1>
                  {quest.length > 0 &&  <span> {quest.length} perguntas</span> }
             </div>

             <form onSubmit={handleSendQuestion}>
                 <textarea
                 placeholder="O que você quer perguntar?"
                 onChange ={event =>setnewText(event.target.value)}
                 value={newText}
                 />
                 <div className="form-footer">

                    { user ? (
                        <div className="user-info">
                            <img src={user.avatar} alt={user.name}/>
                            <span>{ user.name}</span>
                        </div>
                    ) : (
                        <span>Para enviar uma pergunta <button>faça seu login</button></span>
                    )}
                  
                     <Button disabled={!user}>Enviar Pergunta</Button>


                 </div>
             </form>

             {JSON.stringify(quest)}
         </div>
        </div>
    )
}