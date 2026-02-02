const coche = new Object();
coche.marca = "Toyota";
coche.modelo = "Corolla";
coche.año = 2020;
coche.encendido = false;
coche.kilometraje = 0;


coche.arrancar = function arrancar(){
    encendido == true;
    console.log("El coche está encendido")
}

coche. apagar = function apagar(){
    encendido == false 
    console.log("El coche está apagado")
}

coche.recorrer = function(km) {
  this.kilometraje += km;
  console.log(`El coche ha recorrido ${km} km. Kilometraje total: ${this.kilometraje} km.`);
};