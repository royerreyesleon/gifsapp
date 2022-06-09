import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
    
    @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
    
    //buscar( event: any) {
    /*buscar( event: KeyboardEvent) {
        console.log(event);
    }*/
    
    /*buscar(termino: string) {
        console.log(termino);
    }*/
    
    buscar() {
        const valor = this.txtBuscar.nativeElement.value;
        console.log(valor);
        
        this.txtBuscar.nativeElement.value = '';
    }

}
