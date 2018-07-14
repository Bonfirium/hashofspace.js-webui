import * as PIXI from 'pixi.js';
import LoadResources, { TEXTURE, textures } from './loader';

const app = new PIXI.Application(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

(async () => {
	await LoadResources();
	const star = new PIXI.Sprite(textures[TEXTURE.STAR]);
	star.x = app.renderer.width / 2;
	star.y = app.renderer.height / 2;
	star.anchor.x = 0.5;
	star.anchor.y = 0.5;
	app.stage.addChild(star);
	app.ticker.add(() => {
		star.rotation += 0.01;
	});
})();
