import {Component, ElementRef, ViewChild} from '@angular/core';
import {GifsService} from "../services/gifs.service";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'

})
export class BusquedaComponent  {

@ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
constructor (private gifsservice: GifsService){};

  buscar( ) {
    const valor=this.txtBuscar.nativeElement.value;
    //comprobando que la busqueda tenga contenido en la query
    if( valor.trim().length === 0){
      return;
    }
    this.gifsservice.buscarGifs(valor);
    this.txtBuscar.nativeElement.value='';
  }
}
