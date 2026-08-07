import { Link } from "react-router-dom";
import OpportunityCardDetail from "./CardDetail";

function OpportunityElementCard({ record, link_path }) {
    return (
        <Link to={link_path} onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none', color: 'inherit' }} >
            <OpportunityCardDetail record={record} />
        </Link>
    );
}

export default OpportunityElementCard;
