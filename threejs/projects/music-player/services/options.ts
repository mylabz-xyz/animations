import { BehaviorSubject, Observable } from 'rxjs';
import { Color } from 'three';
import { MusicPlayerOptions, SceneMainOptions } from '../models';
import merge from 'ts-deepmerge';
import { Playlist } from '../audio';
import { Themes } from '../themes';

export class OptionsService {
  private sceneMainOptions: BehaviorSubject<SceneMainOptions> = new BehaviorSubject({
    backgroundColor: new Color(''),
    speed: 1
  });
  private sceneMainOptions$: Observable<SceneMainOptions> = this.sceneMainOptions.asObservable();

  private musicPlayerOptions: BehaviorSubject<MusicPlayerOptions> = new BehaviorSubject({
    musicList: [...Playlist],
    musicPlayed: Playlist[0],
    themeList: [...Themes],
    themeSelected: Themes[0]
  });
  private musicPlayerOptions$: Observable<MusicPlayerOptions> = this.musicPlayerOptions.asObservable();

  public setSceneMainOptions(options: SceneMainOptions) {
    const merged = merge.withOptions({ mergeArrays: false }, this.sceneMainOptions.getValue(), options);
    this.sceneMainOptions.next(merged);
  }

  public setMusicPlayerOptions(options: MusicPlayerOptions) {
    const merged = merge.withOptions({ mergeArrays: false }, this.musicPlayerOptions.getValue(), options);
    this.musicPlayerOptions.next(merged);
  }

  public getSceneMainOptions(): Observable<SceneMainOptions> {
    return this.sceneMainOptions$;
  }

  public getMusicPlayerOptions(): Observable<MusicPlayerOptions> {
    return this.musicPlayerOptions$;
  }
}
