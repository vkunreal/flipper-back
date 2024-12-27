export interface APIListResponse<T> {
  count: number
  prev: string | null
  next: string | null
  data: T
}

export interface SelectParams {
  page: number
  limit: number
  host: string
}
