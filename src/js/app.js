import Alpine from 'alpinejs'
import App from './components/App'
import Clock from './components/Clock'

window.Alpine = Alpine

Alpine.data('App', App)
Alpine.data('Clock', Clock)

Alpine.start()