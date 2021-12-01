import Alpine from 'alpinejs'
import BeerTable from './components/BeerTable'
import Clock from './components/Clock'
import Weather from './components/Weather'

window.Alpine = Alpine

Alpine.data('BeerTable', BeerTable)
Alpine.data('Clock', Clock)
Alpine.data('Weather', Weather)

Alpine.start()