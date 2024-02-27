import { useContext } from "react";
import { context } from "../context/context";

const ContextContext = ()=> {
    const {user, setUser, todo, settodo} = useContext(context);

    return {user, setUser, todo, settodo}
}

export default ContextContext;