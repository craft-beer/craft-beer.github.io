const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '6dea0c6c60069933f5a669302f7784b5'

export default () => ({
    cityId: 620127,
    refreshInterval: 10 * 60 * 1000, // api limit: 60 call per minute,
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
    current: {
        description: '',
        icon: '',
        temp: '',
        wind: '',
    },

    init() {
        if (this.refreshInterval < 1000) {
            this.refreshInterval = 1000
        }

        this.refreshData()

        setInterval(() => {
            this.refreshData()
        }, this.refreshInterval)
    },

    async refreshData() {
        const response = await this.requestData()

        this.current.description = response.weather[0].description
        this.current.icon = this.getIconClass(response.weather[0].icon)
        this.current.temp = this.formatTemp(response.main.temp)
        this.current.wind = this.formatWind(response.wind.speed)
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

        return value > 0 ? '+' + value : value
    },

    formatWind(value) {
        return Math.round(value) + 'м/с'
    },

    getIconClass(icon) {
        return this.iconClasses[icon]
    }
})