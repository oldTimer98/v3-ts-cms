const config = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  TIME_OUT: 10000
}
export interface configType {
  BASE_URL: string
  TIME_OUT: number
}
export default config
