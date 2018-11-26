export class Dietas{
    constructor(
      public dias : {
          lunes : {
            caloriasaL ?:string  ,
            carbohidratosL?:string ,
            proteinasL ?:string , 
            grasasL ?:string 
          },
          martes : {
            caloriasM ?:string ,
            carbohidratosM?:string ,
            proteinasM ?:string , 
            grasasM ?:string 
          },
          miercoles : {
            caloriasMI ?:string ,
            carbohidratosMI?:string ,
            proteinasMI ?:string , 
            grasasMI ?:string 
          },
          jueves : {
            caloriasJ ?:string ,
            carbohidratosJ?:string ,
            proteinasJ ?:string , 
            grasasJ ?:string 
          },
          viernes : {
            caloriasV ?:string ,
            carbohidratosV?:string ,
            proteinasV ?:string , 
            grasasV ?:string 
          },
          sabado : {
            caloriasS ?:string ,
            carbohidratosS?:string ,
            proteinasS ?:string , 
            grasasS ?:string 
          },
          domingo : {
            caloriasD ?:string ,
            carbohidratosD?:string ,
            proteinasD ?:string , 
            grasasD ?:string 
          },
      },
      public nombre ?:string,
      public descripcion ?:string,
      public tiempo ?: string,
      public caloriasTotal ?:string,
      public estatus ?: boolean
    ){



    }
}