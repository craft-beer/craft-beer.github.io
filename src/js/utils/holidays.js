class Holidays {
    constructor() {
        this.today = new Date()
        this.month = this.today.getMonth() + 1
        this.day = this.today.getDate()
    }

    getAll() {
        return {
            newYear: this.isNewYear(),
        }
    }

    isNewYear() {
        return (this.month === 12 && this.day >= 1) || (this.month === 1 && this.day <= 15)
    }
}

export default new Holidays()