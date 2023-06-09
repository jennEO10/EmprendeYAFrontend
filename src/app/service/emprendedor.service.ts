import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Emprendedor } from '../model/emprendedor';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class EmprendedorService {
private url=`${base_url}/emprendedor`
private confirmarEliminacion = new Subject<Boolean>()
private listaCambio=new Subject<Emprendedor[]>()

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Emprendedor[]>(this.url);
  }

insert(emprendedor: Emprendedor){
  return this.http.post(this.url,emprendedor)
  }

  setlist(listaNueva: Emprendedor[]){
    this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Emprendedor>(`${this.url}/${id}`);
  }
  update(emp: Emprendedor){
    return this.http.put(this.url + "/" + emp.id,emp);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  getConfirmDelete(){
    return this.confirmarEliminacion.asObservable();
  }
  setConfirmDelete(estado:Boolean){
    this.confirmarEliminacion.next(estado);
}
}
