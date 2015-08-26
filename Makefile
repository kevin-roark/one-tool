build:
	browserify js/main.js --outfile js/build/build.js

watch:
	watchify js/main.js -v -o js/build/build.js

prod:
	browserify js/main.js --outfile js/build/build.js
	minify js/build/build.js > js/build/build.min.js
	minify css/main.css > css/main.min.css

serve:
	serve -p 8555 ./
