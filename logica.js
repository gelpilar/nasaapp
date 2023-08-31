/* 
1. conectar api
2. get con paginacion por tipo 
3. get por buscador
4. 
 */
var pagina= 0;
const btnAnterior = document.getElementById("ante");
const btnSiguiente = document.getElementById("sigu");
btnAnterior.addEventListener("click",()=>
{
    console.log(pagina)
    if(pagina>0)
    {
        pagina-=1;
        console.log(pagina);
       
        cargarPokemons();
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
  
    cargarPokemons();
})

const  cargarPokemons= async()=>
{
    try {
        const rta= await fetch(`https://pokeapi.co/api/v2/pokemon?limit=3&offset=${pagina}`);
        console.log(rta);
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
                
            
                span= carConImagen(nombre,img,i);
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
cargarPokemons();
function agregarADocumento(element,i)
{
    let aux = document.getElementById(`info${i}`);
    console.log(`info${i}`);
    aux.replaceWith(element);
}

/*<span class="info">
<div class="card" >
    <img src="Pokeball_icon-icons.com_67533.png" class="card-img-top" alt="..." style="height: 100px; width: 100px;">
    <div class="card-body" >
      <h5 class="card-title">Pokemon</h5>
      
      <a href="#" class="btn btn-primary" style="height: 10%;">+</a>
    </div>
  </div> 
  
</span>*/

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

function  carConImagen(nombre, imagen,i)
{
    const span = document.createElement('span');
    span.id = 'info'+i;
  
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
  
    span.appendChild(divCard);
  
    return span;
    

}