export const createUniqueId = () => {
    let randoms = new Set([1, 2, 3]);
    while (true) {
        let num = Math.floor(Math.random() * 10);
        console.log(num);
        if (!randoms.has(num)) {
            randoms.add(num);
            return `registeredCard_${num}`;
        }
    }
};
