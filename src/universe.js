import BN from 'bignumber.js';
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
				const { hasSystem, hash } = Generators.UniverseGenerator.getCell(point);
				if (hasSystem) {
					const star = new PIXI.Sprite(textures[TEXTURE.STAR]);
					star.x = x * scale + new BN(`0x${hash.substring(0, 2)}`).toNumber() / 256 * scale;
					star.y = y * scale + new BN(`0x${hash.substring(2, 4)}`).toNumber() / 256 * scale;
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
