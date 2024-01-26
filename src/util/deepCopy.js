export const deepCopy = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    // 배열인 경우 각 요소에 대해 재귀 호출
    return obj.map(deepCopy);
  }

  // 객체인 경우 각 속성에 대해 재귀 호출
  const copiedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copiedObj[key] = deepCopy(obj[key]);
    }
  }

  return copiedObj;
};
