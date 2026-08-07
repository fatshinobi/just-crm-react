import OpportunityCardDetail from "./CardDetail";

function OpportunityCard({ record, link_path }) {
    return (
        <OpportunityCardDetail record={record} showViewButton={true} linkPath={link_path} />
    );
}

export default OpportunityCard;
