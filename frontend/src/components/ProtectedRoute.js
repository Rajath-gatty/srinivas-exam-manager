import { Route } from "react-router-dom";
import {useContextData} from "../hooks/useContextData";

const ProtectedRoute = ({isAuth, component, ...rest }) => {
    const {role} = useContextData();
    return (
        <Route />
    )
}

export default ProtectedRoute;