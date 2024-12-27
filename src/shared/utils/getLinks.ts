import { SelectParams } from './../model/response'

interface NextParams extends SelectParams {
  count: number
}

export const getNextParams = ({ limit, page, count, host }: NextParams) => {
  return count > page * limit ? `${host}?page=${page + 1}&limit=${limit}` : null
}

export const getPrevParams = ({ limit, page, host }: SelectParams) => {
  return page > 1 ? `${host}?page=${page - 1}&limit=${limit}` : null
}
