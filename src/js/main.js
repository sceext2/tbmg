/* main.js, tbmg/src/js/
 * entry file of tbmg
 */
'use strict';

const conf = require('./default.js');
const lan = require('./lan.js');
const core = require('./core.js');


function start_init() {
	
	init_hide_show_about();
	
	init_core();
	// TODO
}

// init hide/show about page function
function init_hide_show_about() {
	
	const title = $('.title span');
	const about = $('.about');
	
	let show = false;
	
	function on_click() {
		if (show) {
			// hide it
			about.removeClass('show');
			console.log('main: hide about page');
			
			show = false;
		} else {
			// show it
			about.addClass('show');
			console.log('main: show about page');
			
			show = true;
		}
	}
	
	title.on('click', on_click);
}

// init core
function init_core() {
	// create a core and set it
	const c = new core();
	c.conf = conf;
	
	// set canvas
	const canvas = $('#c_0');
	c.set_canvas(canvas);
	// init core
	c.reset();
	
	// set start callback
	canvas.on('click', () => {
		c.start();
		
		// log
		console.log('main: game start ');
	});
	
	// TODO set pause callback
	
	// TODO set show core time and fps count callback
}

// start init after dom loaded, with jquery-2
$(start_init);

// TODO exports for DEBUG
/* end main.js */


