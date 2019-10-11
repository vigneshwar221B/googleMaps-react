import Mymap from './Mymap'
import './App.css'

import React from 'react'
import { geolocated } from 'react-geolocated'

const App = props => {
return <Mymap />
	
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: true
	},
	userDecisionTimeout: 5000
})(App)
