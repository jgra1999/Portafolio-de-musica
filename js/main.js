const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

window.addEventListener('load', () => {/* Con esta funcion lo que hacemos es ocultar las imagenes por medio de la opacidad y luego cambiar su opacidad para que sean visibles 
    solo cuando todas las imagenes ya esten cargadas*/
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('img-cargadas');

    //Aqui hacemos todo el codigo que necesitamos para que las categorias funcionen

    const enlaces = document.querySelectorAll('#categorias a');//Aqui lo que hacemos es acceder a los elementos con el id categorias y obtener sus enlaces
    enlaces.forEach ((elemento) => {//Aqui lo que queremos decir es que por cada enlace, se le agregara un evento de tipo click 
        elemento.addEventListener('click', (estado) => {
            estado.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            estado.target.classList.add('activo');//Con target podemos conocer que elemento esta seleccionado 

            const categoria = estado.target.innerHTML;
            categoria === 'Todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria ="${categoria}"]`);
            /* Con este codigo realizamos el filtrado, este es un condicional if, al comienzo antes de los ":" queremos indicar que si la categoria es igual a todos 
            nos mostrara todos los elementos, y si no que es lo que sucede luego de ":" queremos que al hacer click en alguna de las categorias, vamos a obtener la categoria 
            y filtraremos dependiendo de la categoria */
        });
    });


    //Aqui escribiremos el codigo para el funcionamiento de la barra de busqueda 

    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {/* Agregamos un evento a la barra de busqueda en el cual cada vez que nosotros
        escribamos algo en el input se ejecutara la siguiente funcion */
        const busqueda = evento.target.value;//Esta es una variable que contiene el valor de lo que escribimos en el evento de la barra de busqueda
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
        /* grid.filter nos mostrara los elementos que cumplan con las caracteristicas que especificamos, por cada item dela grid, osea las imagenes, va accerder a
        la imagen, obtendra el elemento de la imagen, luego el dataset de etiquetas, y si las etiquetas incluyen la busqueda, entonces lo mostrara en pantalla  */
    });

    //Agregamos el efecto cuando seleccionemos alguna de las imagenes

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        
        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            
            overlay.classList.add('activo'); 
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion; 
         });
    });

    //Aqu haremos que el boton del overlay cierre las imagenes

    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => overlay.classList.remove('activo')); 

    //EventListener del overlay

    overlay.addEventListener('click', (evento) => evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '');
});