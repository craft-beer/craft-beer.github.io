export default () => ({
    date: '',
    time: '',
    withSeconds: false,
    months: [
        'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',
    ],
    days: [
        'Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',
    ],

    init() {
        this.updateDateTime()

        setInterval(() => {
            this.updateDateTime()
        }, this.withSeconds ? 1000 : 60000)
    },

    updateDateTime() {
        this.date  = this.getCurrentDate()
        this.time  = this.getCurrentTime()
    },

    getCurrentDate() {
        const today = new Date()

        const date = this.addLeadingZero(today.getDate())
        const month = this.months[today.getMonth()]
        const day = this.days[today.getDay()]

        return day + ', ' + date + ' ' + month
    },

    getCurrentTime() {
        const today = new Date()
        const time = []

        time.push(this.addLeadingZero(today.getHours()))
        time.push(this.addLeadingZero(today.getMinutes()))

        if (this.withSeconds) {
            time.push(this.addLeadingZero(today.getSeconds()))
        }

        return time.join(':')
    },

    addLeadingZero(value) {
        return ('0' + value).slice(-2)
    }
})