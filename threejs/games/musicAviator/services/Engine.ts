import { LoadingManager, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { EngineBluePrint, ThreeObject } from '../../../models';
import { Sun } from '../../../objects';
import { PlasmaBall } from '../../../objects/balls/Plasma';
import { Frag, Vertex } from '../../../shaders';
import { normalize } from '../../../utils';
import { AirPlane, Ennemy, Light, Sky, Sound, World } from '../entities';
import { EnnemiesHolder } from './EnnemiesHolder';

export class Engine implements ThreeObject, EngineBluePrint {
  public loadingManager: LoadingManager = new LoadingManager();
  public ready = false;

  public colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xf5986e,
    brownDark: 0x23190f,
    blue: 0x68c3c0
  };

  public scene!: Scene;
  public camera!: PerspectiveCamera;
  public renderer!: WebGLRenderer;
  public cameraPosition = {
    x: 0,
    y: 100,
    z: 200
  };

  public speed = 0;
  public initSpeed = 0.00035;
  public baseSpeed = 0.00035;
  public targetBaseSpeed = 0.00035;
  public incrementSpeedByTime = 0.0000025;
  public incrementSpeedByLevel = 0.000005;
  public distanceForSpeedUpdate = 100;
  public speedLastUpdate = 0;

  public distance = 0;
  public ratioSpeedDistance = 50;
  public energy = 100;
  public ratioSpeedEnergy = 3;
  public blankEnergy = false;

  public level = 1;
  public levelLastUpdate = 0;
  public distanceForLevelUpdate = 1000;

  public planeDefaultHeight = 100;
  public planeAmpHeight = 80;
  public planeAmpWidth = 75;
  public planeMoveSensivity = 0.005;
  public planeRotXSensivity = 0.0008;
  public planeRotZSensivity = 0.0004;
  public planeFallSpeed = 0.001;
  public planeMinSpeed = 1.2;
  public planeMaxSpeed = 1.6;
  public planeSpeed = 0;
  public planeCollisionDisplacementX = 0;
  public planeCollisionSpeedX = 0;

  public planeCollisionDisplacementY = 0;
  public planeCollisionSpeedY = 0;

  public seaRadius = 600;
  public seaLength = 800;
  public seaRotationSpeed = 0.006;
  public wavesMinAmp = 5;
  public wavesMaxAmp = 20;
  public wavesMinSpeed = 0.001;
  public wavesMaxSpeed = 0.003;

  public cameraFarPos = 500;
  public cameraNearPos = 150;
  public cameraSensivity = 0.002;

  public coinDistanceTolerance = 15;
  public coinValue = 3;
  public coinsSpeed = 0.5;
  public coinLastSpawn = 0;
  public distanceForCoinsSpawn = 100;

  public ennemyDistanceTolerance = 10;
  public ennemyValue = 10;
  public ennemiesSpeed = 0.6;
  public ennemyLastSpawn = 0;
  public nEnnemies = 0;
  public distanceForEnnemiesSpawn = 50;

  public status = 'playing';

  public deltaTime = 0;
  public newTime = new Date().getTime();
  public oldTime = new Date().getTime();
  public ennemiesPool: Ennemy[] = [];
  public ennemiesHolder!: EnnemiesHolder;
  public particlesPool: any = [];
  public particlesHolder: any;
  public particlesInUse: any = [];
  public mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  public mouseTarget: { x: number; y: number } = { x: 0, y: 0 };

  // UI
  public energyBar!: HTMLElement | null;
  public fieldDistance!: HTMLElement | null;
  public replayMessage!: HTMLElement | null;
  public fieldLevel!: HTMLElement | null;
  public levelCircle!: HTMLElement | null;

  // My objects
  public light!: Light;
  public world!: World;
  public airPlaine!: AirPlane;
  public sky!: Sky;
  public sound!: Sound;

  // Scene settings
  public fog: any;
  public fieldOfView = 50;
  public aspectRatio: number = window.innerWidth / window.innerHeight;
  public nearPlane = 0.1;
  public farPlane = 10000;

  public plasmaBall!: PlasmaBall;
  public sun!: Sun;

  public importSceneCameraRenderer(scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    return this;
  }

  public async init() {
    this.ennemiesHolder = new EnnemiesHolder();
    this.energyBar = document.getElementById('');
    this.fieldDistance = document.getElementById('');
    this.replayMessage = document.getElementById('');
    this.fieldLevel = document.getElementById('');
    this.levelCircle = document.getElementById('');
    this.sound = new Sound();
    this.createScene();
    // add the lights
    this.createLights();
    // add the objects
    await this.createWorld();
    await this.createPlane();
    await this.createAudio();
    this.createPlasmaBall();
    this.createSun();
    this.createSky();
    this.ready = true;
    this.play();
    document.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
  }

  public play() {
    // this.sound.audio.play()
  }
  public async createAudio() {
    await this.sound.load();
    this.camera.add(this.sound.audioListener);
  }

  public createPlasmaBall() {
    this.plasmaBall = new PlasmaBall(this.airPlaine.mesh.scene.position,Vertex.plasmaBall,Frag.plasmaBall);
    this.scene.add(this.plasmaBall.mesh);
  }

  public createSun() {
    this.sun = new Sun(new Vector3(window.innerWidth, window.innerHeight, 0),Vertex.plasmaBall,Vertex.plasmaBall);

    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;
    this.sun.mesh.position.set(250, 250, 0);
    this.scene.add(this.sun.mesh);
  }

  public createScene() {
    const { x, y, z } = this.cameraPosition;
    this.camera.position.x = x;
    this.camera.position.y = y;
    this.camera.position.z = z;
    this.camera['fov'] = this.fieldOfView;
    this.camera['aspect'] = this.aspectRatio;
    this.camera['far'] = this.farPlane;
    this.camera['near'] = this.nearPlane;
    this.camera.updateProjectionMatrix();
  }

  // add the lights
  public createLights() {
    this.light = new Light();
    this.scene.add(this.light.hemisphereLight);
    this.scene.add(this.light.shadowLight);
    this.scene.add(this.light.ambiantLight);
  }

  // add the objects
  public async createPlane() {
    this.airPlaine = new AirPlane();
    await this.airPlaine.createAsync();
    this.scene.add(this.airPlaine.mesh.scene);
  }
  public async createWorld() {
    this.world = new World(this.colors);
    await this.world.createAsync();
    this.world.mesh.position.y = 0;
    this.world.mesh.position.z = -200;
    this.scene.add(this.world.mesh);
  }
  public createSky() {
    this.sky = new Sky(this.colors);
    this.sky.mesh.position.y = -600;
    this.scene.add(this.sky.mesh);
  }

  public update(t: number, delta?: number): void {
    this.mouseTarget.y = normalize(this.mousePosition.y, -0.75, 0.75, 25, 175);
    this.mouseTarget.x = normalize(this.mousePosition.x, -0.75, 0.75, -100, 100);
    // this.sound.update()
    this.updateAirPlaine();
    this.updateWorld();
    this.updateSky();
    this.updateCameraFov();
    this.updateSun(t);

    // this.plasmaBall.update(t);
  }

  public updateCameraFov() {
    (this.camera as any).fov = normalize(this.mousePosition.x, -1, 1, 75, 80);
    (this.camera as any).updateProjectionMatrix();
  }

  public updateAirPlaine() {
    this.airPlaine.mesh.scene.position.y += (this.mouseTarget.y - this.airPlaine.mesh.scene.position.y) * 0.1;
    this.airPlaine.mesh.scene.rotation.x += (this.mouseTarget.y - this.airPlaine.mesh.scene.position.y) * 0.0009;
    this.airPlaine.mesh.scene.position.z = (this.mouseTarget.y - this.airPlaine.mesh.scene.position.y) * 0.0128;
    this.airPlaine.mesh.scene.position.x = (this.airPlaine.mesh.scene.position.y - this.mouseTarget.y) * 0.0064;
  }

  public updateSun(t: number) {
    this.sun.update(t, this.airPlaine.mesh.scene.position);
  }

  public updateWorld() {
    this.world.mesh.rotation.z += 0.0025;
  }

  public updateSky() {
    this.sky.mesh.rotation.z += 0.005;
    // this.sky.moveClouds()
  }

  public updateEnergy() {
    this.energy -= this.speed * this.deltaTime * this.ratioSpeedEnergy;
    this.energy = Math.max(0, this.energy);
    this.energyBar!.style.right = 100 - this.energy + '%';
    this.energyBar!.style.backgroundColor = this.energy < 50 ? '#f25346' : '#68c3c0';

    if (this.energy < 30) {
      this.energyBar!.style.animationName = 'blinking';
    } else {
      this.energyBar!.style.animationName = 'none';
    }

    if (this.energy < 1) {
      this.status = 'this.ver';
    }
  }

  public addEnergy() {
    this.energy += this.coinValue;
    this.energy = Math.min(this.energy, 100);
  }

  public removeEnergy() {
    this.energy -= this.ennemyValue;
    this.energy = Math.max(0, this.energy);
  }

  // public createCoins() { }
  public createEnnemies() {
    for (let i = 0; i < 10; i++) {
      const ennemy = new Ennemy(this.colors.red);
      this.ennemiesPool.push(ennemy);
    }
    this.ennemiesHolder = new EnnemiesHolder();
    //ennemiesHolder.mesh.position.y = -game.seaRadius;
    this.scene.add(this.ennemiesHolder.mesh);
  }

  public spawnEnnemises() {
    for (let i = 0; i < this.nEnnemies; i++) {
      let ennemy: Ennemy;
      if (this.ennemiesPool.length) {
        ennemy = this.ennemiesPool.pop() ?? new Ennemy(this.colors.red);
      } else {
        ennemy = new Ennemy(this.colors.red);
      }

      ennemy.angle = -(i * 0.1);
      ennemy.dist = this.seaRadius + this.planeDefaultHeight + (-1 + Math.random() * 2) * (this.planeAmpHeight - 20);
      ennemy.mesh.position.y = -this.seaRadius + Math.sin(ennemy.angle) * ennemy.dist;
      ennemy.mesh.position.x = Math.cos(ennemy.angle) * ennemy.dist;

      this.ennemiesHolder.mesh.add(ennemy.mesh);
      this.ennemiesHolder.ennemiesInUse.push(ennemy);
    }
  }

  // public createParticles() { }

  public handleMouseMove(event: any) {
    // here we are converting the mouse position value received
    // to a normalized value varying between -1 and 1;
    // for the vertical axis, we need to inverse the formula
    // because the 2D y-axis goes the opposite direction of the 3D y-axis
    this.mousePosition = {
      x: -1 + (event.clientX / window.innerWidth) * 2,
      y: 1 - (event.clientY / window.innerHeight) * 2
    };
  }
}
