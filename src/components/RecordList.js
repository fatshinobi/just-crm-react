import Card from "./Card";

function RecordList() {
    const records = ["test1", "test2", "test3"];
    return (
        <div className="record-list">
            {records.map((record, index) => (
                <Card record={record} />
            ))}
        </div>
    );
}

export default RecordList;