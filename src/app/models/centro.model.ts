import { Horario } from './horario.model';

export class Centro {

    constructor(
        public usuario?: string,
        public nombre_centro?: string,
        public telefono?: string,
        public direccion_comunidad?: string,
        public direccion_provincia?: string,
        public tipoCentro?: string,
        public email_centro?: string,
        public telefono2?: string,
        public img?: string,
        public web?: string,
        public personaContacto?: string,
        public descripcion?: string,
        public procesoAdopcion?: string,
        public amplitudAdopcion?: string,
        public totalAdoptables?: number,
        public direccion_calle?: string,
        public direccion_numero?: string,
        public direccion_CP?: string,
        public mapa_lat?: string,
        public mapa_lon?: string,
        public logo?: string,
        public facebook?: string,
        public instagram?: string,
        public twitter?: string,
        public youtube?: string,
        public fechaRegistro?: string,
        public centro_ok?: boolean,
        public galeria?: string[],
        public _id?: string,
        public likes?: number,
        public horario?: Horario[]
    ) { }
}
