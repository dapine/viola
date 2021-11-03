export const formatSeconds = (value: number): string => {
  let result = Math.floor(value)
  let hh =
    Math.floor(result / 3600) < 10
      ? "0" + Math.floor(result / 3600)
      : Math.floor(result / 3600)
  let mm =
    Math.floor((result / 60) % 60) < 10
      ? "0" + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60)
  let ss =
    Math.floor(result % 60) < 10
      ? "0" + Math.floor(result % 60)
      : Math.floor(result % 60)
  return `${hh}:${mm}:${ss}`
}

export const formatMiliSeconds = (value: number): string => {
  let result = Math.floor(value)
  let mili =  value % 1
  console.log(value, mili * 1000)
  let hh =
    Math.floor(result / 3600) < 10
      ? "0" + Math.floor(result / 3600)
      : Math.floor(result / 3600)
  let mm =
    Math.floor((result / 60) % 60) < 10
      ? "0" + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60)
  let ss =
    Math.floor(result % 60) < 10
      ? "0" + Math.floor(result % 60)
      : Math.floor(result % 60)
  let mil =
    (Math.floor(mili * 1000) < 100 && Math.floor(mili * 1000) > 9)
      ? "0" + Math.floor(mili * 1000)
      : Math.floor(mili * 1000) < 10
        ? "00" + Math.floor(mili * 1000)
        : Math.floor(mili * 1000)
  return `${hh}:${mm}:${ss},${mil}`
}