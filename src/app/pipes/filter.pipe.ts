import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters'
})
export class FilterPipe implements PipeTransform {

  transform(list: any, searchText: string): any {
    if (!list) { return []; }
    if (!searchText) { return list; }

    return list.filter((i: { title: any; }) => i.title.includes(searchText));
  }

}
