import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lowerCaseFirstLetter',
  standalone: true,
})
export class LowerCaseFirstLetterPipe implements PipeTransform {

  transform(value: any, suffix?: string): string {
    return value.charAt(0).toLowerCase() + value.slice(1) + suffix;
  }

}
