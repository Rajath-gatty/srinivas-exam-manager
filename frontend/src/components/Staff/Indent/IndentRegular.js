import "./Indent.css";
import IndentRegularList from "./IndentRegularList";
import FilterSearch from "../../UI/FilterSearch/FilterSearch";
const IndentRegular = () => {
    const departments = [
        "BCA",
        "BBA",
        "BCOM",
        "BHM",
        "BPT"
    ];
    const semeseter = [
        "sem1",
        "sem2",
        "sem3",
        "sem4",
    ]
    return (
        <div className="indent-main">
            <FilterSearch search />
            <div className="main-box">
                <div className="main-header">
                    <h3>SEM1</h3>
                </div>
            </div>
        </div>
    );
};

export default IndentRegular;

