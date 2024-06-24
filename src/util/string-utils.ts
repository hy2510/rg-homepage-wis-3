function renewString(field: unknown) {
  if (field === undefined || field === null) {
    return ''
  }
  const value = String(field)
  return value
}

function renewNumber(field: unknown) {
  if (field === undefined || field === null) {
    return 0
  }
  let num = Number(field)
  if (isNaN(num)) {
    num = 0
  }
  const value = num
  return value
}

function renewBoolean(field: unknown) {
  if (field === undefined || field === null) {
    return false
  }
  const text = String(field).trim().toLowerCase()
  if (text === 'true' || text === 'y') {
    return true
  }
  return false
}
const RenewType = {
  renewString,
  renewNumber,
  renewBoolean,
}
export default RenewType
