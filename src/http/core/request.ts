import { Method, Cors, Cache } from './call'

type BasicRequest = {
  url: string
}
export type HttpRequestOption = {
  method?: Method
  contentType?: string
  headers?: any
  cors?: Cors
  queryString?: any
  body?: any
  timeout?: number
  cache?: Cache
}

export type HttpRequest = BasicRequest & HttpRequestOption
