import copyimg from '../assets/images/copy.svg'
import '../style/room-code.scss'


type RoomCodePros = {
    code:string;
}

export function RoomCode (props : RoomCodePros){

    function copyRoomCodeToClippboard(){

        navigator.clipboard.writeText(props.code)
    }


    return(
        <button className="room-code" onClick={copyRoomCodeToClippboard}>
            <div>
                <img src={copyimg} alt="Copy Room Code"/>
            </div>
            <span> Sala: {props.code} </span>
        </button>
    )
}