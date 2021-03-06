import { getCssClassNames } from '../utils'

export default () => ({
    storageUrl: 'storage.json',
    storage: {},
    loading: true,
    loadingDelay: 1000,
    limitItems: 20,
    availableCountryFlags: [],
    columns: {
        left: [],
        right: [],
    },

    async init() {
        await this.loadAvailableCountryFlags()

        this.storage = await this.loadStorage()

        setTimeout(() => {
            this.splitItemsByColumn()
            this.loading = false
        }, this.loadingDelay)
    },

    loadStorage() {
        return fetch(this.storageUrl + '?' + Date.now())
            .then(res => res.json())
            .then(json => this.processingStorage(json))
            .catch(err => console.error(err))
    },

    loadAvailableCountryFlags() {
        const classes = getCssClassNames('flag-icon-', '/css/app.css', false)

        if (classes.length) {
            classes.forEach((name) => {
                const code = name.split('-')[2]

                if (code && code.length === 2) {
                    this.availableCountryFlags.push(code)
                }
            })
        }
    },

    processingStorage(json) {
        const result = Object.assign({}, json)

        result.items = []

        if (json.items.length) {
            json.items.filter(beer => beer.active).slice(0, this.limitItems).forEach((beer) => {
                if (!beer.cover) {
                    beer.cover = '/images/beer-cover-default.png'
                }

                if (beer.country) {
                    const code = beer.country.toLowerCase()

                    beer.country = {
                        code,
                        isFlag: this.existsCountryFlag(code)
                    }
                }

                beer.price.value = beer.price.value.replace(',', '.')

                result.items.push(beer)
            })
        }

        return result
    },

    splitItemsByColumn() {
        if (!this.storage.items || !this.storage.items.length) {
            return
        }

        const count = this.storage.items.length
        const chunk = Math.ceil(count / 2)

        this.columns.left = this.storage.items.slice(0, chunk)
        this.columns.right = this.storage.items.slice(chunk, count)
    },

    formatNumber(value) {
        return ('0' + value).slice(-2) + '.'
    },

    existsCountryFlag(code) {
        return this.availableCountryFlags.includes(code)
    },
})
