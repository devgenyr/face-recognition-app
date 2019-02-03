import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navigation />
				<Logo />
				{/*
				<ImageLinkForm />
				<FaceRecognition />
				*/}
				{/*
				<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
				*/}
			</div>
		);
	}
}

export default App;
