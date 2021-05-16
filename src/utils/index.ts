export function sleep(sec: number) {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, sec * 1000);
  });
}
