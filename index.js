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
let beatFactorSuperLow;
let beatFactorHi;
let audio;
let elapsedTime;
let buffer;
let mid;

let morphTargets =[];

export default () => {

  // var screenShake = ScreenShake();
  // declare the app and speaker, as well as physics
  const app = useApp();
  let speaker = new THREE.Object3D();
  let audio;
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
      // scale and insert into scene
      speaker.scene.scale.set(4,4,4);
      // speaker.scene.position.set( 15, 0, 10);
      // speaker.scene.quaternion.set(0,1,0,0);
      let physicsId;
      physicsId = physics.addGeometry(speaker.scene);
      physicsIds.push(physicsId);
      app.add(speaker.scene);


      // update world
      app.updateMatrixWorld();
      //console.log(speaker.scene, speaker);

  })();
  
  
  // const speakerInfo ={
  //   fileName: 'react-speaker.glb',
  //   filePath: baseUrl,
  //   obQuarternion: new THREE.Vector4(0,1,0,0),
  //   obScale: new THREE.Vector3(4,4,4),
  // }


   // creating audio with space bar click
   const audioTrackInformation = {
    source: 'https://res.cloudinary.com/musixdevelop/video/upload/track-audios/Sad.mp3',
    autoPlay: true,
    // currentTime: 100.2,
  };

  // function shakeFunc(){
  //   screenShake.update(camera);

  //   requestAnimationFrame( loop );
  //   renderer.render( scene, camera );
  // }

  // play the ^above audio or pause it
  document.body.onkeyup = (e) => {
    if (e.code === 'Digit1') {
      //audio = getAudio({ createOnCall: false })
      console.log("m pressed", audio);
      if (audio.paused !== undefined) {
        if (audio.paused) {
          audio.play()
        } else {
          audio.pause()
          console.log("paused");
        }
      }
      //console.log(beatFactorBass, reactWoofer, beatFactorHi, reactMid);
      //createAudio(audioTrackInformation)
    }
    if (e.code === 'Digit2'){
      console.log("2 pressed");
      // scene.Object3D.getob
      // const audio = findAudio();
      audio = getAudio({ createOnCall: false })
      console.log(audio);
    }
  };
  // run on update
  useFrame(({ timestamp }) => {
    console.log("isrunning", audio);
    if (!audio){
      audio = getAudio({ createOnCall: false })
      console.log(audio);
    }
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
    //console.log(speaker.scene.isMesh());
    if (speaker.scene){
    speaker.scene.traverse(o => {
      if (o.isMesh) {
        o.morphTargetInfluences[0] = reactWoofer;
        o.morphTargetInfluences[1] = reactMid;
        //console.log(o.morphTargetInfluences[0], o.morphTargetInfluences[1], beatFactorSuperLow);
      }
    })
  }
  // //Add shake
  // if (beatFactorSuperLow === 1){

  // }
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



