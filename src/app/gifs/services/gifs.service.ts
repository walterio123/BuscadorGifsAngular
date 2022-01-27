import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchGifsResponse} from "../interfaces/gifsinterface";

@Injectable({
  providedIn: 'root'
})
export class GifsService {
 private apikey: string = 'iOoYZdlfiP11g3r0AQsDJkPRYGG3WmCO';
 private servicioUrl: string='https://api.giphy.com/v1/gifs';

private _historial:string[]=[];


  public resultados: Gif[]=[];

get historial(){
  return [...this._historial];
}
//injectando dependencias  para la query http
  constructor( private http:HttpClient){
  this._historial=JSON.parse(localStorage.getItem('historial') !) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados') !) || [];
  };

 buscarGifs(query: string){
  //pasando  a minusculas para que no se guarden querys repetidas
  query=query.trim().toLocaleLowerCase();
  //comprobando que no haya duplicados y solo los ultimos 10 resultados
  if( !this._historial.includes( query)){
    this._historial.unshift(query);
    this._historial =this._historial.splice(0,10);

    localStorage.setItem('historial',JSON.stringify(this._historial));
  }

  const params= new HttpParams()
    .set('api_key',this.apikey)
    .set('limit','12')
    .set('q',query);


this.http.get<SearchGifsResponse>(`${(this.servicioUrl)}/search`, { params })
  .subscribe( (resp) =>{
    this.resultados=resp.data;
    localStorage.setItem('resultados',JSON.stringify(this.resultados));
    });

}
}
