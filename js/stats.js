let pastCategories = []; /* ARRAY CON CATEGORÍAS DE EVENTOS PASADOS */
let upcomingCategories = []; /* ARRAY CON CATEGORÍAS DE EVENTOS FUTUROS */

obtenerDatos().then(data => {
    let pastStats = []; /* ARRAY DE OBJETOS QUE TIENEN INFORMACIÓN ESTADÍSTICA POR CATEGORÍA */
    let upcomingStats = []; /* ARRAY DE OBJETOS QUE TIENEN INFORMACIÓN ESTADÍSTICA POR CATEGORÍA */
    let mayorPorcentajeAsistencia = 0; 
    let menorPorcentajeAsistencia = 100;
    let mayorCapacidad = 0;
    let index = 0; /* CONTADOR QUE REPLICA EL ÍNDICE DEL ELEMENTO ACTUAL DEL VECTOR DE EVENTOS EN CADA ITERACIÓN */
    
    for (let event of data.events){
        let porcentajeAsistencia = (event.assistance != undefined ? event.assistance / event.capacity * 100 : event.estimate / event.capacity * 100);
        data.events[index].attendancePercentage = porcentajeAsistencia; /* AGREGA EL ATRIBUTO DE PORCENTAJE DE ASISTENCIA AL VECTOR DE EVENTOS */
        if (event.capacity > mayorCapacidad){
            mayorCapacidad = event.capacity; /* GUARDA LA MAYOR CAPACIDAD */
        }

        if (event.date < data.currentDate) {
            pastStats = fillCategoryStatsArray(pastStats, event, "past"); /* ACTUALIZA EL ARRAY DE ESTADÍSTICAS DE LA CATEGORÍA Y EL ARRAY DE CATEGORÍAS */

            if (porcentajeAsistencia > mayorPorcentajeAsistencia){ 
                mayorPorcentajeAsistencia = porcentajeAsistencia; /* GUARDA EL MAYOR PORCENTAJE DE ASISTENCIA DE EVENTOS PASADOS*/
            }
            if (porcentajeAsistencia < menorPorcentajeAsistencia){
                menorPorcentajeAsistencia = porcentajeAsistencia; /* GUARDA EL MENOR PORCENTAJE DE ASISTENCIA DE EVENTOS PASADOS*/
            }
        } else {
            upcomingStats = fillCategoryStatsArray(upcomingStats, event, "upcoming") /* ACTUALIZA EL ARRAY DE ESTADÍSTICAS DE LA CATEGORÍA Y EL ARRAY DE CATEGORÍAS */
        }
        
        index ++;
    }
    document.getElementById('general-stats').innerHTML = createGeneralStats(mayorPorcentajeAsistencia, menorPorcentajeAsistencia, mayorCapacidad, data.events, data.currentDate);
    document.getElementById('past-stats').innerHTML = createCategoriesStats(pastStats);
    document.getElementById('upcoming-stats').innerHTML = createCategoriesStats(upcomingStats);
});


function fillCategoryStatsArray(categoryStats, event, type){ /* ACTUALIZA EL ARRAY DE CATEGORÍAS Y DEVUELVE EL ARRAY DE ESTADÍSTICAS DE LA CATEGORÍA ACTUALIZADO CON LOS DATOS DEL EVENTO*/
    let categories = (type == "past" ? pastCategories : upcomingCategories);
    if (!categories.includes(event.category)){ /* SI LA CATEGORÍA NO ESTÁ EN EL ARRAY DE ESTADÍSTICAS POR CATEGORÍA, LA AGREGA CON LOS VALORES INICIALES EN SUS ATRIBUTOS */
    let stats = {
        category : event.category,
        earnings : (event.assistance != undefined ? event.assistance * event.price : event.estimate * event.price),
        assistance : (event.assistance != undefined ? event.assistance : event.estimate),
        capacity : event.capacity
    };
    (type == "past" ? pastCategories.push(event.category) : upcomingCategories.push(event.category));
    categoryStats.push(stats); /* AGREGA DATOS ESTADÍSTICOS DE NUEVA CATEGORÍA EN ARRAY */
    } else {
        categoryStats.forEach(catStats => {
            if (catStats.category == event.category){
                catStats.earnings += (event.assistance != undefined ? event.assistance * event.price : event.estimate * event.price); /* ACUMULA GANANCIAS */
                catStats.assistance += (event.assistance != undefined ? event.assistance : event.estimate); /* ACUMULA ASISTENCIA */
                catStats.capacity += event.capacity; /* ACUMULA CAPACIDAD */
            }
        });
    }
    return categoryStats;
}


function createGeneralStats(highestPercentageAttendance, lowestPercentageAttendance, largerCapacity, events, currentDate){ /* GENERA Y RETORNA EL HTML DE LAS ESTADÍSTICAS GENERALES */
    /* VARIABLES QUE ALMACENAN CADENAS DE TEXTO CON NOMBRES DE EVENTOS QUE CUMPLEN LAS CONDICIONES*/
    let highestAttendanceEventstxt = "<ul>";
    let lowestAttendanceEventstxt = "<ul>";
    let largerCapacitytxt = "<ul>";

    /* FILTROS DE EVENTOS Y ARMADO DE HTML CON LISTAS DE NOMBRES DE EVENTOS QUE CUMPLEN LAS CONDICIONES */
    events.filter(event => event.date < currentDate && event.attendancePercentage == highestPercentageAttendance).forEach(event => {
       highestAttendanceEventstxt += `<li>${event.name}</li>`;
    });
    console.log(highestPercentageAttendance);
    events.filter(event => event.date < currentDate && event.attendancePercentage == lowestPercentageAttendance).forEach(event => {
        lowestAttendanceEventstxt += `<li>${event.name}</li>`;
     });
     events.filter(event => event.capacity == largerCapacity).forEach(event => {
        largerCapacitytxt += `<li>${event.name}</li>`;
     });

    return `<tr>
        <td>${highestAttendanceEventstxt}</ul><b>Percentage of attendance:</b> ${Math.round(highestPercentageAttendance * 100) / 100}%</td>
        <td>${lowestAttendanceEventstxt}</ul><b>Percentage of attendance:</b> ${Math.round(lowestPercentageAttendance * 100) / 100}%</td>
        <td>${largerCapacitytxt}</ul><b>Capacity:</b> ${largerCapacity}</td>
    </tr>`;
}


function createCategoriesStats(categories){ /* GENERA Y RETORNA EL HTML DE LAS ESTADÍSTICAS POR CATEGORÍAS */
    let html = "";
    categories.forEach(category => {
        html += `<tr>
        <td>${category.category}</td>
        <td>$ ${category.earnings}</td>
        <td>` + Math.round(category.assistance / category.capacity * 10000) / 100 + ` %</td>
    </tr>`;
    })
    return html;
}