import Card from "./Card";

function RecordList({ records }) {
    return (
        <div className="record-list">
            {records.map((record, index) => (
                <Card record={record} key={index} />
            ))}
        </div>
    );
}

export default RecordList;