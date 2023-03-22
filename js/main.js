const { createApp } = Vue

createApp({
    data() {
        return {
            urlApi: 'https://mindhub-xj03.onrender.com/api/amazing',
            events: [],
            eventsCopy: [],
            currentDate: new Date,
            searchText: '',
            categories: [],
            pastCategories: [],
            upcomingCategories: [],
            selectedCategories: [],
            location: "Home",

            highestAttendanceEvents: [],
            lowestAttendanceEvents: [],
            largerCapacityEvents: [],


            generalStats: {
                highestPercentageAttendance: 0,
                lowestPercentageAttendance: 100,
                largerCapacity: 0
            },
            pastCategoryStats: [],
            upcomingCategoryStats: [],
            detailEvent: {},
        }
    },
    created() {
        this.getData()


    },
    mounted() {

    },
    methods: {
        getData() {
            fetch(this.urlApi)
                .then(response => response.json())
                .then(data => {
                    this.events = data.events;
                    this.eventsCopy = data.events;
                    this.currentDate = new Date(data.currentDate);
                    this.extractCategories(data.events);
                    if (window.location.href.includes("details")){
                        this.getDetailsInfo();
                    }
                })
                .catch(error => console.log(error.message));
        },

        extractCategories(events) {
            events.forEach(event => {
                if (!this.categories.includes(event.category)) {
                    this.categories.push(event.category)
                }
            })
        },

        fillCategoryStatsArray(categoryStats, event, type) { /* ACTUALIZA EL ARRAY DE CATEGORÍAS Y DEVUELVE EL ARRAY DE ESTADÍSTICAS DE LA CATEGORÍA ACTUALIZADO CON LOS DATOS DEL EVENTO*/
            let categories = (type == "past" ? this.pastCategories : this.upcomingCategories);
            if (!categories.includes(event.category)) { /* SI LA CATEGORÍA NO ESTÁ EN EL ARRAY DE ESTADÍSTICAS POR CATEGORÍA, LA AGREGA CON LOS VALORES INICIALES EN SUS ATRIBUTOS */
                let stats = {
                    category: event.category,
                    earnings: (event.assistance != undefined ? event.assistance * event.price : event.estimate * event.price),
                    assistance: (event.assistance != undefined ? event.assistance : event.estimate),
                    capacity: event.capacity
                };
                (type == "past" ? this.pastCategories.push(event.category) : this.upcomingCategories.push(event.category));
                categoryStats.push(stats); /* AGREGA DATOS ESTADÍSTICOS DE NUEVA CATEGORÍA EN ARRAY */
            } else {
                categoryStats.forEach(catStats => {
                    if (catStats.category == event.category) {
                        catStats.earnings += (event.assistance != undefined ? event.assistance * event.price : event.estimate * event.price); /* ACUMULA GANANCIAS */
                        catStats.assistance += (event.assistance != undefined ? event.assistance : event.estimate); /* ACUMULA ASISTENCIA */
                        catStats.capacity += event.capacity; /* ACUMULA CAPACIDAD */
                    }
                });
            }
            return categoryStats;
        },

        getDetailsInfo() {
            let events = JSON.parse(JSON.stringify(this.eventsCopy));
            const queryString = location.search;
            const params = new URLSearchParams(queryString);
            const idEvento = params.get("id");
            this.detailEvent = events.find(evento => evento._id == idEvento);

            /* AGREGA ATRIBUTO DE TIPO (ASSISTANCE O ESTIMATE) Y NÚMERO DE ASISTENCIA */
            if (this.detailEvent.assistance != undefined) {
                this.detailEvent.assistanceType = "Asistencia";
                this.detailEvent.assistanceNumber = this.detailEvent.assistance;
            } else {
                this.detailEvent.assistanceType = "Estimate";
                this.detailEvent.assistanceNumber = this.detailEvent.estimate;
            }
        },
        
    },
    computed: {
        eventCardsFilter() {
            const eventsCop = JSON.parse(JSON.stringify(this.eventsCopy));
            const eventsCopy = eventsCop.filter(event => {
                switch (this.location) {
                    case "Home":
                        return true;
                    case "Upcoming Events":
                        return new Date(event.date) >= new Date(this.currentDate);
                    case "Past Events":
                        return new Date(event.date) < new Date(this.currentDate);
                }
            });

            let firstFilter = eventsCopy.filter(event =>
                event.name.toUpperCase().includes(this.searchText.toUpperCase())
                || event.description.toUpperCase().includes(this.searchText.toUpperCase())
            )

            if (this.selectedCategories.length != 0) {
                this.events = firstFilter.filter(event => this.selectedCategories.includes(event.category));
            } else {
                this.events = firstFilter;
            }
        },

        calculateStats() {
            let events = JSON.parse(JSON.stringify(this.eventsCopy));
            let pastStats = []; /* ARRAY DE OBJETOS QUE TIENEN INFORMACIÓN ESTADÍSTICA POR CATEGORÍA */
            let upcomingStats = []; /* ARRAY DE OBJETOS QUE TIENEN INFORMACIÓN ESTADÍSTICA POR CATEGORÍA */
            let mayorPorcentajeAsistencia = 0;
            let menorPorcentajeAsistencia = 100;
            let mayorCapacidad = 0;
            let index = 0; /* CONTADOR QUE REPLICA EL ÍNDICE DEL ELEMENTO ACTUAL DEL VECTOR DE EVENTOS EN CADA ITERACIÓN */

            for (let event of events) {
                let porcentajeAsistencia = (event.assistance != undefined ? event.assistance / event.capacity * 100 : event.estimate / event.capacity * 100);
                this.eventsCopy[index].attendancePercentage = porcentajeAsistencia; /* AGREGA EL ATRIBUTO DE PORCENTAJE DE ASISTENCIA AL VECTOR DE EVENTOS */
                if (event.capacity > mayorCapacidad) {
                    mayorCapacidad = event.capacity; /* GUARDA LA MAYOR CAPACIDAD */
                }

                if (new Date(event.date) < new Date(this.currentDate)) {
                    pastStats = this.fillCategoryStatsArray(pastStats, event, "past"); /* ACTUALIZA EL ARRAY DE ESTADÍSTICAS DE LA CATEGORÍA Y EL ARRAY DE CATEGORÍAS */

                    if (porcentajeAsistencia > mayorPorcentajeAsistencia) {
                        mayorPorcentajeAsistencia = porcentajeAsistencia; /* GUARDA EL MAYOR PORCENTAJE DE ASISTENCIA DE EVENTOS PASADOS*/
                    }
                    if (porcentajeAsistencia < menorPorcentajeAsistencia) {
                        menorPorcentajeAsistencia = porcentajeAsistencia; /* GUARDA EL MENOR PORCENTAJE DE ASISTENCIA DE EVENTOS PASADOS*/
                    }
                } else {
                    upcomingStats = this.fillCategoryStatsArray(upcomingStats, event, "upcoming") /* ACTUALIZA EL ARRAY DE ESTADÍSTICAS DE LA CATEGORÍA Y EL ARRAY DE CATEGORÍAS */
                }

                index++;
            }
            this.pastCategoryStats = pastStats;
            this.upcomingCategoryStats = upcomingStats;
            this.generalStats.highestPercentageAttendance = mayorPorcentajeAsistencia;
            this.generalStats.lowestPercentageAttendance = menorPorcentajeAsistencia;
            this.generalStats.largerCapacity = mayorCapacidad;
            this.highestAttendanceEvents = this.eventsCopy.filter(event => new Date(event.date) < new Date(this.currentDate) && event.attendancePercentage == mayorPorcentajeAsistencia);
            this.lowestAttendanceEvents = this.eventsCopy.filter(event => new Date(event.date) < new Date(this.currentDate) && event.attendancePercentage == menorPorcentajeAsistencia);
            this.largerCapacityEvents = events.filter(event => event.capacity == mayorCapacidad);
        },
    },
}).mount('#app')