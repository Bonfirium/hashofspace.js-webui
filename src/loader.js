import * as PIXI from 'pixi.js';
import ImgStar from './assets/images/star.png';

export const TEXTURE = {
	STAR: 'star',
};

const images = {
	[TEXTURE.STAR]: ImgStar,
};

export const textures = {};

for (let imageName in images) {
	PIXI.loader.add(imageName, images[imageName]);
}

export default function LoadResources() {
	return new Promise((resolve) => {
		PIXI.loader.load((loader, resources) => {
			for (let imageName in images) {
				textures[imageName] = resources[imageName].texture;
			}
			resolve();
		});
	});
}
