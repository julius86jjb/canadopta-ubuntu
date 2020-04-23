import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';



@Pipe({
  name: 'fechaPanelControl'
})
export class FechaPanelControlPipe implements PipeTransform {

  transform(value: Date | moment.Moment, dateFormat: string): any {
    return moment(value).format(dateFormat);
}

}
