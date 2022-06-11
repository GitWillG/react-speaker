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
import { Vector3 } from 'three';

const { useApp, useLoaders, useFrame, useCleanup, usePhysics, useInternals } = metaversefile;
  
const baseUrl = import.meta.url.replace(/(\/)[^\/\\]*$/, '$1');

let reactWoofer;
let reactMid;

let beatFactorBass;
let beatFactorSuperLow;
let beatFactorHi;
let audio;
let elapsedTime;
let buffer;
let mid;

let morphTargets =[];

export default () => {

  var screenShake = ScreenShake();
  // declare the app and speaker, as well as physics
  const app = useApp();
  let speaker = new THREE.Object3D();
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


      // speaker.scene.traverse(o => {
      //   if (o.isMesh) {
      //     // o.morphTargetInfluences[0] = 1;
      //     reactWoofer = o.morphTargetInfluences[0];
      //     reactMid = o.morphTargetInfluences[1];
      //     console.log(o.morphTargetInfluences[0]);
      //   }
      //   if(o.name === 'Woofer') {  console.log("found woofer") }
      // });
      //fan.scene.position.y=1;
      //fan.scene.rotation.x = Math.PI/2;
      // group.add(fan.scene);

      // scale and insert into scene
      speaker.scene.scale.set(1,1,1);
      speaker.setRotationFromAxisAngle(new THREE.Vector3(0,1,0), Math.Pi)
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
      console.log(speaker.scene, speaker);

  })();
  

   // creating audio with space bar click
   const audioTrackInformation = {
    source: 'https://res.cloudinary.com/musixdevelop/video/upload/track-audios/Sad.mp3',
    autoPlay: true,
    // currentTime: 100.2,
  };

  function shakeFunc(){
    screenShake.update(camera);

    requestAnimationFrame( loop );
    renderer.render( scene, camera );
  }

  // play the ^above audio or pause it
  document.body.onkeyup = (e) => {
    if (e.code === 'Digit1') {
      const audio = getAudio({ createOnCall: false })
      console.log("m pressed", audio);
      if (audio.paused !== undefined) {
        if (audio.paused) {
          audio.play()
        } else {
          audio.pause()
          console.log("paused");
        }
      }
      console.log(beatFactorBass, reactWoofer, beatFactorHi, reactMid);
      createAudio(audioTrackInformation)
    }
  };
  // run on update
  useFrame(({ timestamp }) => {
  elapsedTime = timestamp;
  const threshold = getThreshold();

  // apply the factors to the morphs
  if (beatFactorBass){
    reactWoofer = beatFactorBass;
    // console.log(reactWoofer);

  };
  if (beatFactorHi){
    reactMid = beatFactorHi;
    // console.log(reactMid);
  };
  // console.log(speaker.scene.isMesh());
  speaker.scene.traverse(o => {
    if (o.isMesh) {
      o.morphTargetInfluences[0] = reactWoofer;
      o.morphTargetInfluences[1] = reactMid;
      console.log(o.morphTargetInfluences[0], o.morphTargetInfluences[1], beatFactorSuperLow);
    }
  })
  //Add shake
  if (beatFactorSuperLow === 1){

  }
  //speaker.updateMatrix();

  //app.updateMatrixWorld();

  //some presets for low and hi frequencies
  beatFactorHi = getFrequenciesByRange({
    horizontalRangeStart: 80,
    horizontalRangeEnd: 108,
    verticalRangeStart: 140,
    verticalRangeEnd: 170,
  });
  beatFactorBass = getFrequenciesByRange({
    horizontalRangeStart: 30,
    horizontalRangeEnd: 60,
    verticalRangeStart: 60,
    verticalRangeEnd: 140,
  });
  // shake based off this
  beatFactorSuperLow = getFrequenciesByRange({
    horizontalRangeStart: 25,
    horizontalRangeEnd: 40,
    verticalRangeStart: 60,
    verticalRangeEnd: 120,
  });


});
  useCleanup(() => {
    for (const physicsId of physicsIds) {
      physics.removeGeometry(physicsId);
    }
  });

  return app; 
};



