import "./ApprovalDetailsView.css"
import { Avatar, Camera } from "../../Assets";
import {useContextData} from "../../hooks/useContextData";

const StudentApprovalView = () => {
    const {role} = useContextData();
    
    return(
        <div className="ApprovalDetailsView">
            <div className="approve-user-info">
                <div className="user-avatar flex">
                    <img src={Avatar} width="40px" alt="avatar" />
                    <img src={Camera} width="10px" alt="avatar" />
                </div>

                <div className="user-name">
                    <h2>John Doe</h2>
                    <h3>{role.charAt(0).toUpperCase() + role.slice(1)}</h3>
                </div>
            </div>
        </div>
    )
}

export default StudentApprovalView;