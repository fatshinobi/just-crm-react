import Card from "./Card";

function RecordList({ records, defaultImage }) {
    return (
        <div className="record-list">
            {records.map((record, index) => (
                <Card record={record} defaultImage={defaultImage} key={index} />
            ))}
        </div>
    );
}

export default RecordList;