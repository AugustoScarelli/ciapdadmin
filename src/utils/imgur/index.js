export const get = (data) => ({
  key: data.split('@')[1],
  url: `https://i.imgur.com/${data.split('@')[0]}`,
})

export const set = ({ url, key }) => `${url.split('/')[3]}@${key}`

export default {
  get,
  set,
}
