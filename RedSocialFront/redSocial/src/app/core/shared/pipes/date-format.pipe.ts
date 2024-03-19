/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Pipe, PipeTransform } from '@angular/core'
import { DatePipe } from '@angular/common'

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform (value: string, format: string = 'dd/MM/yyyy'): string {
    const datePipe: DatePipe = new DatePipe('en-US')
    const formattedDate = datePipe.transform(value, format)
    const valueDateFormat = formattedDate ?? ''
    return valueDateFormat
  }
}
