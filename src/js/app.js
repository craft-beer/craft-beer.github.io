import Alpine from 'alpinejs'
import BeerTable from './components/BeerTable'
import Logo from './components/Logo'
import Clock from './components/Clock'
import Weather from './components/Weather'

Alpine.data('BeerTable', BeerTable)
Alpine.data('Clock', Clock)
Alpine.data('Weather', Weather)
Alpine.data('Logo', Logo)

Alpine.start()