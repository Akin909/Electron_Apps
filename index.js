//Cat picture is an npm module that just displays a cat it is saved into a var
var {
	remote
} = require('electron');
var fs = require('fs');

var picture = require('cat-picture');
// image is the visualisation module that allows you to draw polygons
var image = require('lightning-image-poly')
	// Saves the source of the image and then removes it
var src = picture.src;
picture.remove();
// The cat picture is then called inside the visualisation div with a method of
// the module called convex
var viz = new image('#visualization', null, [src], {
	hullAlgorithm: 'convex'
})

// Creates a function that saves current window to a pdf
function save() {
	remote.getCurrentWindow().webContents.printToPDF({
		portrait: true
	}, function(err, data) {
		fs.writeFile('annotation.pdf', data, function(err) {
			if (err) {
				alert('error generating pdf!' + err.message)
			} else {
				alert('pdf saved!')
			}
		})
	})

}

window.addEventListener('keydown',function(event) {
	if (event.keyCode === 80) {
		save();	
	}	
})
