export default () => ({
    storageUrl: 'storage.json',
    storage: {},
    loading: true,
    loadingDelay: 1000,
    columns: {
        left: [],
        right: [],
    },

    async init() {
        this.storage = await this.loadStorage()

        setTimeout(() => {
            this.splitItemsByColumn()
            this.loading = false
        }, this.loadingDelay)
    },

    loadStorage() {
        return fetch(this.storageUrl + '?' + Date.now())
            .then(res => res.json())
            .then(json => json)
            .catch(err => console.error(err))
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
        return ('0' + value).slice(-2)
    }
})
