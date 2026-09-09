import OpportunityCardDetail from "./CardDetail";

function OpportunityCard({ record, link_path, onDelete = null, delete_path = null }) {
    return (
        <OpportunityCardDetail
            record={{ ...record, delete_path }}
            showViewButton={true}
            linkPath={link_path}
            onDelete={onDelete}
            showDeleteButton={true}
        />
    );
}

export default OpportunityCard;
