import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtersearch'
})
export class FiltersearchPipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    if (!items || !value) {
      return items;
    }
    return items.filter(e => (e.name ? e.name : e).toLowerCase().includes(value.toLocaleLowerCase()));
  }
}
