/* 
1. conectar api
2. get con paginacion por tipo 
3. get por buscador
4. 
 */
var pagina= 0;
var pokemon= "";



const btnAnterior = document.getElementById("ante");
const btnSiguiente = document.getElementById("sigu");
const buscador= document.getElementById("buscador");

var inf2= document.getElementById("info2");
var inf3= document.getElementById("info3");
var inf1 = document.querySelector("#info1 ");
console.log(inf1);
inf1.addEventListener("click", (evento) => {
    console.log("hola");
});
/**
 * Sacar los elementos y ponerlos en un arreglo
 * Abstraer la muestra a arreglos
 * hacer que las etiquetas desaparezcan cuando busque a uno
 * Guardar los ultimos tres
 * Cuando borro lo buscado mostrar los ultimos tres
 * Hacer pantalla de carga 
 * 
 */



buscador.addEventListener("keydown",(e)=>
{
    if(e.key=== "Enter")
    {
        var valor= buscador.value
        console.log(valor)
        pokemon=String(valor);
        buscarUnPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    }else if(e.key==="Backspace" && buscador.value!="")
    {
        let urlTodo= `https://pokeapi.co/api/v2/pokemon?limit=3&offset=${pagina}`;
        cargarPokemons(urlTodo);
    }
});

btnAnterior.addEventListener("click",()=>
{
    console.log(pagina)
    if(pagina>0)
    {
        pagina-=1;
        console.log(pagina);
        let urlTodo= `https://pokeapi.co/api/v2/pokemon?limit=3&offset=${pagina}`;

        cargarPokemons(urlTodo);
        if(pagina==0)
    {
        
        btnAnterior.style.backgroundColor="gray";
    }
       
    }
    
});
btnSiguiente.addEventListener("click",()=>
{
    console.log(pagina)
    if(pagina>=0)
    {
        
        btnAnterior.style.backgroundColor="#5c6db5";
    }
    pagina+=1;
    console.log(pagina);
  
    let urlTodo= `https://pokeapi.co/api/v2/pokemon?limit=3&offset=${pagina}`;

    cargarPokemons(urlTodo);
})



function borrarLosElementos(pos)
{
    var element = document.createElement('div');
    element.className = 'card invisible'; 
    agregarADocumento(element,pos);

}


const buscarUnPokemon= async(url)=>
{
    try {
       
        const rta= await fetch(url);
        
        if(rta.status===200)
        {
            
            
            const datos= await rta.json();
            console.log(datos);
            let img= datos.sprites.front_default;
            let nombre= datos.name;
            let span= carConImagen(nombre,img);
            borrarLosElementos(2);
            borrarLosElementos(3);
            agregarADocumento(span,1);
           
            
            
            
        }
        else if(rta.status===401)
        {

        }
        else if (rta.status===404)
        {

        }
       
        
    } catch (error) {
        console.log(error);
    }

}
const  cargarPokemons= async(url)=>
{
    try {
       
        const rta= await fetch(url);
        if(rta.status===200)
        {
            const datos= await rta.json();
            console.log();
            var arreglo= datos.results;
            let img;
            let nombre;
            let span;
            let i=1;
            arreglo.forEach(async(element) => {
                img=  await cargarImagen(element.url);
                
                nombre= element.name;
                
            
                span= carConImagen(nombre,img);
                arregloAuxi[i-1]=span;
                agregarADocumento(span,i);
                i++;
            }); 
        }
        else if(rta.status===401)
        {

        }
        else if (rta.status===404)
        {

        }
       
        
    } catch (error) {
        console.log(error);
    }
    
};
cargarPokemons(`https://pokeapi.co/api/v2/pokemon?limit=3&offset=0`);
var arregloAuxi=Array();



function agregarADocumento(element,i)
{
    let aux = document.getElementById(`info${i}`);
    if(i==2)
    {
        console.log(aux.getElementsByClassName("card")[0]);

    }

    aux.getElementsByClassName("card")[0].replaceWith(element);


    
}

const cargarImagen=async(url)=>{
    
    try {
        const rta= await fetch(url);
        console.log(rta);
        if(rta.status===200)
        {
           
           
            
            let rta3= await fetch(url);
            
            
            let datos1= await rta3.json();
            console.log(datos1.sprites);

            let img= datos1.sprites.front_default;
            return img;
        }
        else if(rta.status===401)
        {

        }
        else if (rta.status===404)
        {

        }
       
        
    } catch (error) {
        console.log(error);
    }
}

function  carConImagen(nombre, imagen)
{
    
  
    const divCard = document.createElement('div');
    divCard.className = 'card';
  
    const img = document.createElement('img');
    img.src = String(imagen);
    img.className = 'card-img-top';
    img.alt = '...';
    img.style.height = '100px';
    img.style.width = '100px';
  
    const divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
  
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.textContent = nombre;
  
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'btn btn-primary';
    a.style.height = '10%';
    a.textContent = '+';
  
    divCardBody.appendChild(h5);
    divCardBody.appendChild(a);
  
    divCard.appendChild(img);
    divCard.appendChild(divCardBody);
  
    
  
    return divCard;
    

}

/// busqueda por buscador

