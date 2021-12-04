import Holidays from '../utils/holidays'

export default () => ({
    holidays: {},

    init () {
        this.holidays = Holidays.getAll()
    }
})