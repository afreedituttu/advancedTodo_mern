import {useState, createContext} from 'react'

export const context = createContext();

const ContextProvider = ({children})=> {
    const [user, setUser] = useState(null);
    const [todo, settodo] = useState([]);

    return (<context.Provider value={{user, todo, setUser, settodo}}>
        {children}
    </context.Provider>)
}

export default ContextProvider;