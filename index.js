import * as THREE from 'three';
import metaversefile from 'metaversefile';

import {
  createAudio,
  getAudio,
  getFrequenciesByRange,
  getThreshold,
  logMood,
  updateMoodArray,
} from './audio/index.js';

const { useApp, useLoaders, useFrame, useCleanup, usePhysics, useInternals } = metaversefile;
  
const baseUrl = import.meta.url.replace(/(\/)[^\/\\]*$/, '$1');

let reactWoofer;
let reactMid;

let beatFactorBass;
let beatFactorHi;
let audio;
let elapsedTime;
let buffer;
let mid;
let morphTargets =[];

export default () => {


  // declare the app and speaker, as well as physics
  const app = useApp();
  let speaker = null;
  //let prop = null;
  const physics = usePhysics();
  const physicsIds = [];
  //load in the asset from same location at /glb
  (async () => {
      const u = `${baseUrl}/react-speaker.glb`;
      speaker = await new Promise((accept, reject) => {
          const {gltfLoader} = useLoaders();
          gltfLoader.load(u, accept, function onprogress() {}, reject);
          
      });


      speaker.scene.traverse(o => {
        if (o.isMesh) {
          console.log(o);
        }
        if(o.name === 'Woofer') {  console.log("found woofer") }
      });
      //fan.scene.position.y=1;
      //fan.scene.rotation.x = Math.PI/2;
      // group.add(fan.scene);

      // scale and insert into scene
      speaker.scene.scale.set(1,1,1);
      app.add(speaker.scene);
      let physicsId;
      physicsId = physics.addGeometry(speaker.scene);
      physicsIds.push(physicsId);


      // const geometry = new THREE.CircleGeometry( 1, 32 );
      // const material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent:true, opacity:0.5, side: THREE.DoubleSide } );
      // const circle = new THREE.Mesh( geometry, material );
      // circle.rotation.x = Math.PI / 2;
      // circle.position.y = 0.1;
      // app.add( circle );

      // update world
      app.updateMatrixWorld();


  })();
  speaker.

  //  // creating audio with space bar click
  //  const audioTrackInformation = {
  //   source: baseUrl + 'music/dungeon.mp3',
  //   autoPlay: true,
  //   // currentTime: 100.2,
  // };

  // play the ^above audio or pause it
  document.body.onkeyup = (e) => {
    if (e.code === 'Digit1') {
      const audio = getAudio({ createOnCall: false })
      console.log("m pressed"), audio;
      if (audio.paused !== undefined) {
        if (audio.paused) {
          audio.play()
        } else {
          audio.pause()
          console.log("paused");
        }
      }
      createAudio(audioTrackInformation)
    }
  };
  elapsedTime = timestamp
  const threshold = getThreshold()
  logAudio(){


  }



  
  useCleanup(() => {
    for (const physicsId of physicsIds) {
      physics.removeGeometry(physicsId);
    }
  });

  return app; 
};



