export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;

  const isMobile = /Mobi|Android/i.test(userAgent);
  const isiOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  if (isMobile && isiOS) {
    return "iOS";
  } else if (isMobile && isAndroid) {
    return "Android";
  } else {
    return "Web";
  }
};
