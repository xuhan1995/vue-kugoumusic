export const formmatTime = value => {
  let seconds = parseInt(value);
  let minute = Math.floor(seconds / 60);
  if (minute < 10) {
    minute = '0' + minute;
  }
  let second = seconds % 60;
  if (second < 10) {
    second = '0' + second;
  }
  return minute + ':' + second;
}
export const hideDetailPlayer = (store) => {
  store.commit('showDetailPlayer',false);
}