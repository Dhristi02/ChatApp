import { useState } from "react"
import "./chatList.css"
import { preview } from "vite"
import AddUser from "./addUser/addUser"
import {useUserStore} from "../../../lib/userStore"
import { doc } from "firebase/firestore"

const ChatList = () => {
    const[chats,setChats]=useState([])
    const[addMode,setAddMode]=useState(false)
    const[input,setInput]=useState("")

    const {currentUser} = useUserStore()
    const {chatId, changeChat} = useChatStore()

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

    const handleSelect=async (chat)=>{
        const userChats=chats.map((item)=>{
            const {user,...rest}=item
            return rest
        })
        const chatIndex=userChats.findIndex(
            (item)=>item.chatId===chat.chatId
        )
        userChats[chatIndex].isSeen=true
        const userChatsRef=doc(db,"userchats",currentUser.id)
        try{
            await updateDoc(userChatsRef,{
                chats:userChats,
            })
            changeChat(chat.chatId,chat.user)
        }catch(err){
            console.log(err)
        }
        
    }

    const filteredChats=chats.filter((c)=>
    c.user.username.toLowerCase().includes(input.toLowerCase()))

    return (
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt=""/>
                    <input type="text" placeholder="Search" onChange={(e)=>setInput(e.target.value)}/>
                </div>
                <img 
                    src={addmode?"./minus.png":"./plus.png"} 
                    alt="" 
                    className="add"
                    onClick={()=> setAddMode((prev)=>!prev)}
                />
            </div>
            {filteredChats.map((chat) => (
                <div className="item" 
                key={chat.chatId} 
                onClick={()=>handleSelect(chat)}
                style={{
                    backgroundColor: chat?.isSeen?"transparent":"#5183fe",
                }}
                >
                    <img src={chat.user.blocked.includes(currentUser.id)?"./avatar.png" :chat.user.avatar || "./avatar.png" }alt=""/>
                    <div className="texts">
                        <span>{chat.user.blocked.includes(currentUser.id)
                        ?"User"
                        :chat.user.username}
                    </span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
                
            {addMode && <AddUser/>}
        </div>
    )
}

export default ChatList