export const getTimeAgo = (logTimestamp) => {
    const currentTimestamp = Date.now();
    const timeDifference = currentTimestamp - logTimestamp;
    const seconds = Math.floor(timeDifference / 1000);

    const timeUnits = [
        { unit: "년전", divisor: 12 },
        { unit: "달전", divisor: 30 },
        { unit: "일전", divisor: 24 },
        { unit: "시간전", divisor: 60 },
        { unit: "분전", divisor: 60 },
        { unit: "초전", divisor: 1 },
    ];

    let timeValue = seconds;

    for (const unit of timeUnits) {
        if (timeValue >= unit.divisor) {
            timeValue = Math.floor(timeValue / unit.divisor);
            return `${timeValue}${unit.unit}`;
        }
    }

    return `${timeValue}${timeUnits[timeUnits.length - 1].unit}`;
};
