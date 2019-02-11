import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ( { box, imageUrl } ) => {
	return(
		<div className={'center'}>
			<div className={'relative mt4'}>
				<img id={'input-image'} src={ imageUrl } alt="detected faces" width={'500px'} height={'auto'} />
				<div className={'bounding-box'} style={ { top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow } }></div>
			</div>
		</div>
	);
};

export default FaceRecognition;
