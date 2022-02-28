export interface GlobalConfig {
  defaultPageTitle: string
  playersURL: string
  seasonAveragesURL: string
}

export interface Averages {
  [key: string]: string | number
}
