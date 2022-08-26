import "./NoData.css";
import {NoDataSvg} from "../../../Assets";

const NoData = ({text}) => {
  return (
    <div className="NoData-container flex">
        <h4>{text ? text : "No Records Found"}</h4>
        <img src={NoDataSvg} alt="No Data" width="400px" height="auto" />
    </div>
  )
}

export default NoData;