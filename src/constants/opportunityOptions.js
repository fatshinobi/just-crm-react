export const opportunityStages = [
    {key: "0", value: "Awareness"},
    {key: "1", value: "Interest"},
    {key: "2", value: "Decision"},
    {key: "3", value: "Buy"}
];

export const opportunityStatuses = [
    {key: "0", value: "Draft"},
    {key: "1", value: "Active"},
    {key: "2", value: "Closed"}
];

export const defaultImage = (record) => {
    switch (record.stage) {
        case 0:
            return "M12 8v4l3 3m-3-7a7 7 0 100 14A7 7 0 0012 8z";
        case 1:
            return "M1 12s8 7 11 7 11-7 11-7-8-7-11-7S1 12 1 12z";
        case 2:
            return "M12 2l3 9h9l-6 5 2 9-7-5-7 5 2-9z";
        case 3:
            return "M5 13l4 4L19 7";
        default:
            return "M12 8v4l3 3m-3-7a7 7 0 100 14A7 7 0 0012 8z";
    }
};

export const slassForStage = (record) => {
    switch (record.stage) {
        case 0:
            return "text-gray-500";
        case 1:
            return "text-blue-500";
        case 2:
            return "text-orange-500";
        case 3:
            return "text-green-500";
        default:
            return "text-gray-500";
    }
};

export const slassForStatus = (record) => {
    switch (record.status) {
        case 0:
            return "text-gray-500";
        case 1:
            return "text-black";
        case 2:
            return "text-black line-through";
        default:
            return "text-gray-500";
    }
};
