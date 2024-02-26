import { useContext } from "react";
import { context } from "../context/context";

const ContextContext = ()=> {
    const {user, setUser, todo, setTodo} = useContext(context);

    return {user, setUser, todo, setTodo}
}

export default ContextContext;