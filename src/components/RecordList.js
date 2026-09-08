import Card from "./Card";

function RecordList({ records, defaultImage, onDelete }) {
    return (
        <div className="record-list">
            {records.map((record, index) => (
                <Card record={record} defaultImage={defaultImage} onDelete={onDelete} key={index} />
            ))}
        </div>
    );
}

export default RecordList;