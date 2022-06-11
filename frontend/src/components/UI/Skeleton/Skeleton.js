import "./Skeleton.css";
const Skeleton = ({rows=4, cols=4,profile=false,marginTop='0em'}) => {
    const rowsArr = Array(rows).fill();
    const colsArr = Array(cols).fill();

    return (
        <table className="skeleton-table" style={{marginTop}}>
            <thead>
                <tr className="skeleton-table-row">
                    {colsArr.map((_,i) => {
                        return <th key={i}><div className="skeleton-content"></div></th>
                    })}
                </tr>
            </thead>
            <tbody>
            {rowsArr.map((_,i) => {
                return <tr key={i} className="skeleton-table-row sm-width">
                {colsArr.map((_,i) => {
                 return profile && i===0 
                    ? <td key={i} className="profile-relative"><div className="skeleton-circle "></div></td> 
                    : <td key={i}><div className="skeleton-content"></div></td>
                })}
            </tr>
            })}
            </tbody>
        </table>
    )
  }

  export default Skeleton;