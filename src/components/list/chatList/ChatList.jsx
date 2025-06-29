import { useState } from "react"
import "./chatList.css"
import { preview } from "vite"
import AddUser from "./addUser/addUser"
import {useUserStore} from "../../../lib/userStore"

const ChatList = () => {
    const[chats,setChats]=useState([])
    const[addMode,setAddMode]=useState(false)

    const {currentUser} = useUserStore()

    useEffect( () => {
        const unSub = onSnapshot(doc(db, "userchats", "currentuser.id"), async (res) => {
            const items = res.data().chats
            
            const promises = items.map( async(item) => {
                const userDocRef = doc(db, "users", items.receiverId);
                const userDocSnap = await getDoc(userdocRef)

                const user = userDocSnap.data()

                return {...item, user}
            })

            const chatData = await Promise.all(promises)
            setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt))
        })

        return ()=>{
            unSub();
        }
    }, [currentUser.id]);

    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt=""/>
                    <input type="text" placeholder="Search"/>
                </div>
                <img 
                    src={addmode?"./minus.png":"./plus.png"} 
                    alt="" 
                    className="add"
                    onClick={()=> setAddMode((prev)=>!prev)}
                />
            </div>
            {chats.map((chat) => (
                <div className="item" key={chat.chatId}>
                    <img src="./avatar.png" alt=""/>
                    <div className="texts">
                        <span>Jane Doe</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
                
            {addMode && <AddUser/>}
        </div>
    )
}

export default ChatList