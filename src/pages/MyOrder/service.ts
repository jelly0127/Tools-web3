interface variablesData {
  first: number
  orderDirection: string
  timestamp: number
  maker?: string
}
interface RequestParams {
  query: string
}
interface actionType {
  type: keyof variablesData
  value?: any
}

export { RequestParams, variablesData, actionType }
