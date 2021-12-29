require('dotenv').config();

const APP_URI = process.env.NODE_ENV === 'production' 
	? process.env.REACT_APP_URI
	: (process.env.NODE_ENV === 'development'
		? process.env.REACT_APP_DEV_URI
		: process.env.REACT_APP_TEST_URI);

const exportedObject = { APP_URI };
export default exportedObject;