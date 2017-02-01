const os = require('os');
const browser = os.platform() === 'linux' ? 'google-chrome' : (
	os.platform() === 'darwin' ? 'google chrome' : (
		os.platform() === 'win32' ? 'chrome' : 'firefox'));


module.exports ={
	port: 8000,
	browser : browser,
	paths:{
		src: "./src",
		build: "./build",
		index: "./src/index.html",
		stylesheets: ["./src/stylesheets/app.less"],
		app: "./src/app/app.js",
		js: './src/app/**/**.js'
	},

	browserSync: {
		proxy: 'http://localhost:8000/index.html',
		files: ['build/**/*.*'],
		browser: browser,
		port: 8001
	}

};