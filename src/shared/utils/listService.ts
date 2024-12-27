import { Repository } from 'typeorm'
import { APIListResponse, SelectParams } from '../model/response'
import { getNextParams, getPrevParams } from './getLinks'

interface GetList<T> extends SelectParams {
  repository: Repository<T>
}

export async function getListFromRepository<T>({
  limit,
  page,
  host,
  repository,
}: GetList<T>): Promise<APIListResponse<T[]>> {
  const [data, count] = await repository.findAndCount({
    take: limit,
    skip: (page - 1) * limit,
  })

  const next = getNextParams({ limit, page, count, host })
  const prev = getPrevParams({ limit, page, host })

  return {
    data,
    count,
    next,
    prev,
  }
}
