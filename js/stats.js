obtenerDatos().then(data => {
    let pastCategories = []; /* ARRAY CON CATEGORÍAS DE EVENTOS PASADOS */
    let upcomingCategories = []; /* ARRAY CON CATEGORÍAS DE EVENTOS FUTUROS */
    let pastStats = []; /* ARRAY DE OBJETOS QUE TIENEN INFORMACIÓN ESTADÍSTICA POR CATEGORÍA */
    let upcomingStats = []; /* ARRAY DE OBJETOS QUE TIENEN INFORMACIÓN ESTADÍSTICA POR CATEGORÍA */
    let mayorPorcentajeAsistencia = 0; 
    let menorPorcentajeAsistencia = 100;
    let mayorCapacidad = 0;
    let index = 0; /* CONTADOR QUE REPLICA EL ÍNDICE DEL ELEMENTO ACTUAL DEL VECTOR DE EVENTOS EN CADA ITERACIÓN */
    
    for (let event of data.events){
        let porcentajeAsistencia = (event.assistance != undefined ? event.assistance / event.capacity * 100 : event.estimate / event.capacity * 100);
        data.events[index].attendancePercentage = porcentajeAsistencia; /* AGREGA EL ATRIBUTO DE PORCENTAJE DE ASISTENCIA AL VECTOR DE EVENTOS */
        if (porcentajeAsistencia > mayorPorcentajeAsistencia){ 
            mayorPorcentajeAsistencia = porcentajeAsistencia; /* GUARDA EL MAYOR PORCENTAJE DE ASISTENCIA */
        }
        if (porcentajeAsistencia < menorPorcentajeAsistencia){
            menorPorcentajeAsistencia = porcentajeAsistencia; /* GUARDA EL MENOR PORCENTAJE DE ASISTENCIA */
        }
        if (event.capacity > mayorCapacidad){
            mayorCapacidad = event.capacity; /* GUARDA LA MAYOR CAPACIDAD */
        }

        if (event.date < data.currentDate) {
            if (!pastCategories.includes(event.category)){ /* SI LA CATEGORÍA NO ESTÁ EN EL ARRAY DE ESTADÍSTICAS POR CATEGORÍA, LA AGREGA CON LOS VALORES INICIALES EN SUS ATRIBUTOS */
                    let stats = {
                    category : event.category,
                    earnings : (event.assistance != undefined ? event.assistance * event.price : event.estimate * event.price),
                    assistance : (event.assistance != undefined ? event.assistance : event.estimate),
                    capacity : event.capacity
                };
                pastCategories.push(event.category);
                pastStats.push(stats); /* AGREGA DATOS ESTADÍSTICOS DE NUEVA CATEGORÍA EN ARRAY */
            } else {
                pastStats.forEach(pastCategoriesStats => {
                    if (pastCategoriesStats.category == event.category){
                        pastCategoriesStats.earnings += (event.assistance != undefined ? event.assistance * event.price : event.estimate * event.price); /* ACUMULA GANANCIAS */
                        pastCategoriesStats.assistance += (event.assistance != undefined ? event.assistance : event.estimate); /* ACUMULA ASISTENCIA */
                        pastCategoriesStats.capacity += event.capacity; /* ACUMULA CAPACIDAD */
                    }
                });
            }
        } else {
            if (!upcomingCategories.includes(event.category)){ /* SI LA CATEGORÍA NO ESTÁ EN EL ARRAY DE ESTADÍSTICAS POR CATEGORÍA, LA AGREGA CON LOS VALORES INICIALES EN SUS ATRIBUTOS */
                    stats = {
                    category : event.category,
                    earnings : (event.assistance != undefined ? event.assistance * event.price : event.estimate * event.price),
                    assistance : (event.assistance != undefined ? event.assistance : event.estimate),
                    capacity : event.capacity
                };
                upcomingCategories.push(event.category);
                upcomingStats.push(stats); /* AGREGA DATOS ESTADÍSTICOS DE NUEVA CATEGORÍA EN ARRAY */
            } else {
                upcomingStats.forEach(upcomingCategoriesStats => {
                    if (upcomingCategoriesStats.category == event.category){
                        upcomingCategoriesStats.earnings += (event.assistance != undefined ? event.assistance * event.price : event.estimate * event.price); /* ACUMULA GANANCIAS */
                        upcomingCategoriesStats.assistance += (event.assistance != undefined ? event.assistance : event.estimate); /* ACUMULA ASISTENCIA */
                        upcomingCategoriesStats.capacity += event.capacity; /* ACUMULA CAPACIDAD */
                    }
                });
            }
        }
        index ++;
    }
    document.getElementById('general-stats').innerHTML = createGeneralStats(mayorPorcentajeAsistencia, menorPorcentajeAsistencia, mayorCapacidad, data.events);
    document.getElementById('past-stats').innerHTML = createCategoriesStats(pastStats);
    document.getElementById('upcoming-stats').innerHTML = createCategoriesStats(upcomingStats);
});


function createGeneralStats(highestPercentageAttendance, lowestPercentageAttendance, largerCapacity, events){
    /* VARIABLES QUE ALMACENAN CADENAS DE TEXTO CON NOMBRES DE EVENTOS QUE CUMPLEN LAS CONDICIONES*/
    let highestAttendanceEventstxt = "";
    let lowestAttendanceEventstxt = "";
    let largerCapacitytxt = "";

    /* FILTROS DE EVENTOS Y ARMA CADENA DE TEXTO CON NOMBRES DE EVENTOS QUE CUMPLEN LAS CONDICIONES */
    events.filter(event => event.attendancePercentage == highestPercentageAttendance).forEach(event => {
       if (highestAttendanceEventstxt != ""){
            highestAttendanceEventstxt += " - ";
       }
       highestAttendanceEventstxt += event.name ;
    });
    events.filter(event => event.attendancePercentage == lowestPercentageAttendance).forEach(event => {
        if (lowestAttendanceEventstxt != ""){
            lowestAttendanceEventstxt += " - ";
        }
        lowestAttendanceEventstxt += event.name ;
     });
     events.filter(event => event.capacity == largerCapacity).forEach(event => {
        if (largerCapacitytxt != ""){
            largerCapacitytxt += " - ";
        }
        largerCapacitytxt += event.name ;
     });

    return `<tr>
        <td>${highestAttendanceEventstxt}.<br><br><b>Percentage of attendance:</b> ${highestPercentageAttendance}%</td>
        <td>${lowestAttendanceEventstxt}.<br><br><b>Percentage of attendance:</b> ${lowestPercentageAttendance}%</td>
        <td>${largerCapacitytxt}.<br><br><b>Capacity:</b> ${largerCapacity}</td>
    </tr>`;
}


function createCategoriesStats(categories){
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