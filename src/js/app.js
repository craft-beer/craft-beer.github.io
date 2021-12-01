import Alpine from 'alpinejs'
import App from './components/App'
import Clock from './components/Clock'
import Weather from './components/Weather'

window.Alpine = Alpine

Alpine.data('App', App)
Alpine.data('Clock', Clock)
Alpine.data('Weather', Weather)

Alpine.start()