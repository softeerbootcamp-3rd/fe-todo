export function differenceFormat(now, ms) {
  const diff = parseInt((now - ms) / 1000);
  if (diff < 3600) return `${parseInt(diff / 60)}분 전`;
  if (diff < 86400) return `${parseInt(diff / (60 * 60))}시간 전`;
  return `${parseInt(diff / (60 * 60 * 24))}일 전`;
}
