import { Tools, Generators } from 'hashofspace.js-lib';
import { TEXTURE, textures } from './loader';
import * as PIXI from 'pixi.js';

/** @type {Universe} */
let singleton = null;

export default class Universe {
	constructor(width, height, app) {
		if (singleton) {
			singleton.destructor();
		}
		singleton = this;
		const scale = 64;
		for (let x = 0, xTo = width / scale; x <= xTo; x++) {
			for (let y = 0, yTo = height / scale; y <= yTo; y++) {
				const point = new Tools.Point(x, y);
				if (Generators.UniverseGenerator.getCell(point).hasSystem) {
					const star = new PIXI.Sprite(textures[TEXTURE.STAR]);
					star.x = x * scale;
					star.y = y * scale;
					star.width = scale;
					star.height = scale;
					star.anchor.x = 0.5;
					star.anchor.y = 0.5;
					app.stage.addChild(star);
				}
			}
		}
	}

	destructor() {
		singleton = null;
	}
}
