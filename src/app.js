import * as PIXI from 'pixi.js';
import LoadResources from './loader';
import Universe from './universe';

const app = new PIXI.Application(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

(async () => {
	await LoadResources();
	new Universe(window.innerWidth, window.innerHeight, app);
	// app.ticker.add(() => {
	// });
})();
