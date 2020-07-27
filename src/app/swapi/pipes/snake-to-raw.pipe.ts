import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'snakeToRaw' })
export class SnakeToRawPipe implements PipeTransform {
  transform(value: string): string {
    return value.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
}
