const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '6dea0c6c60069933f5a669302f7784b5'

export default () => ({
    cityId: 620127,
    refreshIntervalMinutes: 5, // api limit: 60 call per minute,
    current: {
        description: '',
        icon: '',
        temp: '',
        wind: '',
        pressure: '',
    },
    iconClasses: {
        '01d': 'fa-sun',
        '01n': 'fa-moon',
        '02d': 'fa-cloud-sun',
        '02n': 'fa-cloud-moon',
        '03d': 'fa-cloud',
        '03n': 'fa-cloud',
        '04d': 'fa-cloud',
        '04n': 'fa-cloud',
        '09d': 'fa-cloud-showers-heavy',
        '09n': 'fa-cloud-showers-heavy',
        '10d': 'fa-cloud-sun-rain',
        '10n': 'fa-cloud-moon-rain',
        '11d': 'fa-bolt',
        '11n': 'fa-bolt',
        '13d': 'fa-snowflake',
        '13n': 'fa-snowflake',
        '50d': 'fa-smog',
        '50n': 'fa-smog',
    },

    init() {
        if (this.refreshIntervalMinutes < 1) {
            this.refreshIntervalMinutes = 1
        }

        this.refreshData()

        setInterval(() => {
            this.refreshData()
        }, this.refreshIntervalMinutes * 60 * 1000)
    },

    async refreshData() {
        const response = await this.requestData()

        this.current.description = response.weather[0].description
        this.current.icon = this.getIconClass(response.weather[0].icon)
        this.current.temp = this.formatTemp(response.main.temp)
        this.current.wind = this.formatWind(response.wind.speed)
        this.current.pressure = this.formatPressure(response.main.pressure)
    },

    requestData() {
        const url = API_URL + `?id=${this.cityId}&appid=${API_KEY}&lang=ru&units=metric`

        return fetch(url)
            .then(response => response.json())
            .then(json => json)
            .catch(err => console.error(err))
    },

    formatTemp(value) {
        value = Math.round(value)

        return (value > 0 ? '+' + value : value) + '°'
    },

    formatWind(value) {
        return Math.round(value)
    },

    formatPressure(value) {
        return Math.round( value / 1.333)
    },

    getIconClass(icon) {
        return this.iconClasses[icon] || false
    },
})