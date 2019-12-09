import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FireService } from '../services/fire.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form_busqueda: FormGroup
  id_origen: any
  id_destino: any

  ciudades:any = []
  list_viajes:any = []
  list_autobuses:any =[]

  constructor(private formBuilder: FormBuilder, private fire: FireService, private api: ApiService, private route: Router) {
    this.form_busqueda = this.formBuilder.group({
      'id_origen': [""],
      'id_destino': [""],
      'fecha_de_salida': [""],
     // 'hora_de_salida': [""]
    })
   }

  ngOnInit() {
    this.api.getCiudades().subscribe(result =>{
      this.ciudades = result
    }) 

    this.api.getAutobuses().subscribe(result =>{
      this.list_autobuses = result
    })
  }

  comprarBoleto(id_autobus:any, id_viaje:any){
    console.log(id_autobus, id_viaje)
    this.route.navigateByUrl("/seleccionar-boleto/"+id_autobus+"/"+id_viaje)
  }

  buscar(){
    console.log(this.form_busqueda.value)
    this.api.getViajes(this.form_busqueda.value).subscribe(result =>{
      console.log(result)
      this.list_viajes = result
    })
  }

}
