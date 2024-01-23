export const calculatorTime = (logTimestamp) => {
    const currentTimestamp = Date.now();
    const timeDifference = currentTimestamp - logTimestamp;
    const seconds = Math.floor(timeDifference / 1000);

    const timeUnits = [
        { unit: "년", divisor: 12 },
        { unit: "달", divisor: 30 },
        { unit: "일", divisor: 24 },
        { unit: "시간", divisor: 60 },
        { unit: "분", divisor: 60 },
        { unit: "초", divisor: 1 },
    ];

    let timeValue = seconds;

    for (const unit of timeUnits) {
        if (timeValue >= unit.divisor) {
            timeValue = Math.floor(timeValue / unit.divisor);
            return `${timeValue}${unit.unit} 전`;
        }
    }

    return `${timeValue}${timeUnits[timeUnits.length - 1].unit} 전`;
};
