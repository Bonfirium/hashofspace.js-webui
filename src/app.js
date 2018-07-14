import * as PIXI from 'pixi.js';
import BlackHole from './assets/images/blackhole.png';

const app = new PIXI.Application(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

PIXI.loader.add('blackhole', BlackHole).load((loader, resources) => {
	const blackhole = new PIXI.Sprite(resources.blackhole.texture);

	blackhole.x = app.renderer.width / 2;
	blackhole.y = app.renderer.height / 2;
	blackhole.anchor.x = 0.5;
	blackhole.anchor.y = 0.5;
	app.stage.addChild(blackhole);

	app.ticker.add(() => {
		blackhole.rotation += 0.01;
	});
});
