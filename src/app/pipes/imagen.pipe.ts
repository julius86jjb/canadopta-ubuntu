import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

    transform(img: string, tipo: string = 'usuario'): any {

        let url =  URL_SERVICIOS + '/img';

        if ( !img ) {
            // una ruta que no exista para que el backend devuelva la imagen por defecto
            return url + '/usuarios/xxx';
        }

        if ( img.indexOf('https') >= 0 ) {
            return img;
          }

          switch ( tipo ) {

            case 'usuario':
              url += '/usuarios/' + img;
            break;

            case 'centro':
              url += '/centros/' + img;
            break;

            case 'mascota':
               url += '/mascotas/' + img;
            break;

            default:
              console.log('tipo de imagen no existe, usuario, medico, hospital');
              url += '/usuarios/xxx';
          }

          return url;

    }

}
