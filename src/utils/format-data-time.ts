import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const data_time_format = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = data_time_format
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
