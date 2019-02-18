import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import clarifaiApiKey from './secrets';

import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
	apiKey: clarifaiApiKey
});

const particlesOptions = {
	particles: {
		number: {
			value: 90,
			density: {
				enable: true,
				value_area: 800
			}
		},
	},
	interactivity: {
		detect_on: 'window',
		events: {
			onhover: {
				enable: true,
				mode: 'grab'
			},
			onclick: {
				enable: true,
				mode: 'repulse'
			},
			resize: true
		},
		modes: {
			grab: {
				distance: 300,
				line_linked: {
					opacity: 0.8
				}
			},
			repulse: {
				distance: 275,
				duration: 0.2
			},
			push: {
				particles_nb: 4
			},
			remove: {
				particles_nb: 2
			}
		}
	},
	retina_detect: true
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false
		}
	}

	calculateFaceLocation = ( data ) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById( 'input-image' );
		const imageWidth = Number( image.width );
		const imageHeight = Number( image.height );
		return {
			topRow: clarifaiFace.top_row * imageHeight,
			leftCol: clarifaiFace.left_col * imageWidth,
			bottomRow: imageHeight - ( clarifaiFace.bottom_row * imageHeight ),
			rightCol: imageWidth - ( clarifaiFace.right_col * imageWidth )
		}
	};

	displayFaceBox = ( box ) => {
		// console.log( box );
		this.setState( { box } );
	};

	onInputChange = ( event ) => {
		this.setState( { input: event.target.value } );
	};

	onButtonSubmit = () => {
		this.setState( { imageUrl: this.state.input } );
		app.models.predict(
			Clarifai.FACE_DETECT_MODEL,
			this.state.input )
				.then( response => this.displayFaceBox( this.calculateFaceLocation( response ) ) )
				.catch( err => console.log( err ) );
		console.log('click');
	};

	onRouteChange = ( route ) => {
		if ( route === 'signout' ) {
			this.setState( { isSignedIn: false } );
		} else if ( route === 'home' ) {
			this.setState( { isSignedIn: true } );
		}
		this.setState( { route: route } );
	};

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
		return (
			<div className="App">
				<Particles className={'particles'} params={ particlesOptions } />
				<Navigation isSignedIn={ isSignedIn } onRouteChange={ this.onRouteChange } />
				{
					route === 'home' ?
						<div>
							<Logo />
							<Rank />
							<ImageLinkForm
									onInputChange={ this.onInputChange }
									onButtonSubmit={ this.onButtonSubmit }
							/>
							<FaceRecognition box={ box } imageUrl={ imageUrl } />
						</div>
					:
					(
						route === 'signin' ?
							<Signin onRouteChange={ this.onRouteChange } />
							:
							<Register onRouteChange={ this.onRouteChange } />
					)

				}
				{/*
				<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
				*/}
			</div>
		);
	}
}

export default App;
