import logoImg from '../assets/images/logo.svg'
import { Button } from '../common/buttom'
import '../style/Room.scss'


export function Rooms(){
    return(
       <div id="page-room">
           <header>
               <div className="content">
                 <img src={logoImg}/>
                 <div>codigo</div>
               </div>
           </header>

         

           <main className="content">
           <div className="room-title">
                 <h1>Sala React</h1>
                 <span>4 perguntas</span>
             </div>

               <form>
                   <textarea placeholder="O que você gostaria de perguntar?"/>

                   <div className="form-footer">
                       <span>Para enviar uma pergunta, <button>Faça seu Login</button> </span>
                       <Button type="submit">Enviar pergunta</Button>
                   </div>
               </form>
           </main>
       </div>
    )
}