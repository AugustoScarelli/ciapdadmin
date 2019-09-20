import cpfFunc from './cpf'
import birthdateFunc from './birthdate'

export const imgur = data => (/^[a-zA-Z0-9]{1,16}\.[a-z]{1,4}@[a-zA-Z0-9]{1,32}$/).test(data)
export const commonText = data => (/^([a-zA-Z\u00e0-\u00f6\u00f8-\u00ff]+(_[a-zA-Z\u00e0-\u00f6\u00f8-\u00ff]+)*)(\s([a-zA-Z\u00e0-\u00f6\u00f8-\u00ff]+(_[a-zA-Z\u00e0-\u00f6\u00f8-\u00ff]+)*))*$/).test(data)
export const email = data => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(data)
export const cpf = cpfFunc
export const date = data => (/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/).test(data)
export const birthdate = birthdateFunc
export const phone = data => (/^[1-9]{2}[2-9][0-9]{7,8}$/).test(data)
export const cid = data => (/^[a-zA-Z][0-9]{2}\.[0-9]$/).test(data)
export const houseNumber = data => (/^[a-zA-Z0-9\u00e0-\u00f6\u00f8-\u00ff]{1,8}$/).test(data)
export const others = data => (/^[a-zA-Z0-9\u00e0-\u00f6\u00f8-\u00ff ]{1,128}$/).test(data)
export const rf = data => (/^[0-9]{1,16}$/).test(data)
export const cnpj = data => (/^[0-9]{14}$/).test(data)
export const ytbUrl = data => (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/).test(data)

export default {
  imgur,
  commonText,
  email,
  cpf,
  date,
  birthdate,
  phone,
  cid,
  houseNumber,
  others,
  rf,
  cnpj,
  ytbUrl,
}
