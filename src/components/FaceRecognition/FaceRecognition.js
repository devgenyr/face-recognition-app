import React from 'react';

const FaceRecognition = ( { imageUrl } ) => {
	return(
		<div className={'center'}>
			<div className={'mt4'}>
				<img src={ imageUrl } alt="detected faces" width={'500px'} height={'auto'} />
			</div>
		</div>
	);
};

export default FaceRecognition;
