import {
	Audio as ThreeAudio,
	AudioAnalyser,
	AudioListener,
	AudioLoader,
} from 'three';
import { ThreeObject } from '../../../models';

export class Sound implements ThreeObject {
	public audioListener: AudioListener;
	public audioLoader: AudioLoader;
	public audioAnalyser: AudioAnalyser;
	public audio: ThreeAudio;
	private _audio: HTMLAudioElement;
	private audioType = '';
	constructor() {
		this.audioListener = new AudioListener();
		this.audioLoader = new AudioLoader();
		this.audio = new ThreeAudio(this.audioListener);
		this._audio = new Audio();
		this.audioAnalyser = new AudioAnalyser(this.audio, 512);
		if (this._audio.canPlayType('audio/mpeg')) {
			this.audioType = 'mp3';
		} else if (this._audio.canPlayType('audio/ogg; codecs="vorbis"') != '') {
			this.audioType = 'ogg';
		}
	}

	public load() {
		return new Promise((res, err) => {
			this.audioLoader.load(
				`/three/KUWAGO-Colors.${this.audioType}`,
				(buffer) => {
					this.audio.setBuffer(buffer);
					this.audio.setLoop(true);
					this.audio.setVolume(0.5);
					res(true);
				},
				() => {
					console.log('on progress');
				},
				(err) => {
					res(false);
				}
			);
		});
	}

	public ftt() {
		// node to the analyser
		const dataArray = this.audioAnalyser.getFrequencyData();
		console.log(dataArray);

		// slice the array into two halves
		const lowerHalfArray = dataArray.slice(0, dataArray.length / 2 - 1);
		const lowerHalfArrayAvg =
			lowerHalfArray.reduce((a, b) => a + b, 0) / lowerHalfArray.length;
		const upperHalfArray = dataArray.slice(
			dataArray.length / 2 - 1,
			dataArray.length - 1
		); // do some basic reductions/normalisations
		const upperHalfArrayAvg =
			lowerHalfArray.reduce((a, b) => a + b, 0) / lowerHalfArray.length;

		const lowerMax = Math.max(lowerHalfArray as any);
		const lowerAvg = lowerHalfArrayAvg;
		const upperAvg = upperHalfArrayAvg;
		const lowerMaxFr = lowerMax / lowerHalfArray.length;
		const lowerAvgFr = lowerAvg / lowerHalfArray.length;
		const upperAvgFr = upperAvg / upperHalfArray.length;

		return {
			lowerAvg,
			lowerAvgFr,
			lowerHalfArray,
			lowerHalfArrayAvg,
			lowerMax,
			lowerMaxFr,
			upperAvg,
			upperAvgFr,
			upperHalfArray,
			upperHalfArrayAvg,
		};
	}

	public update(t: number) {
		this.ftt();
	}
}
