import { Component, OnInit , OnDestroy } from '@angular/core';
import { Observable , Subscriber, Subscription } from 'rxjs';
import {retry , map , filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit , OnDestroy {

  subscription:Subscription;

  constructor() { 
    

    this.subscription = this.regresaObservable().pipe( 
     retry(3)
     ).subscribe(
      numero => console.log('Subs', numero),
      error => console.log('Error en obs', error) ,
      () => console.log('El observador termino')
    );


  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }



  regresaObservable() : Observable< any >{
    return new Observable( (observer : Subscriber<any>) =>{
      let contador =1;
        const intervalo = setInterval(()=>{
          contador ++;  
        const salida = {
          valor:contador
        };
        console.log('Este es el valor :',salida.valor);
          observer.next(salida);
  
         // if(contador ===3){
          //  clearInterval(intervalo);
          //  observer.complete();
        //  }
         // if(contador == 2){
           // clearInterval(intervalo);
          //  observer.error();
         // }

        }, 1000);
      }).pipe(
        map( (resp) => resp.valor),
        filter((valor , index)=>{
          //filtrando lo que me interesa pasar con el filter 
          if ((valor % 2 ) ===1){
            return true;
          }else{
          return false;
          }
        })
       );
      
  }

}
