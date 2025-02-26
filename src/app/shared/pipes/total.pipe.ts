import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform {
  transform(item: any, ...args: any[]): any {
    if (item) {
      if (args[0] === 'incVat') {
        return item.nbOfDays * item.unitPrice * (1 + item.vat / 100);
      }
      return item.nbOfDays * item.unitPrice;
    }
  }
}
