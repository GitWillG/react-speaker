import * as THREE from 'three';
import metaversefile from 'metaversefile';

// import {
//   createAudio,
//   getAudio,
//   getFrequenciesByRange,
//   getThreshold,
//   logMood,
//   updateMoodArray,
// } from './audio/index.js';

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
  const app = useApp();
  app.name = 'react-Speaker';
  const physics = usePhysics();
  
 
  
 // ->CLEAN
 let physicsIds = [];
 (async () => {
  const u = `${baseUrl}react-speaker.glb`;
  console.log(u);
  let o = await new Promise((accept, reject) => {
    const {gltfLoader} = useLoaders();
    gltfLoader.load(u, accept, function onprogress() {}, reject);
  });
  console.log("glb data", o);
  const physicsId = physics.addGeometry(o);
  physicsIds.push(physicsId);
  })();
  
  
  //cleanup
  useCleanup(() => {
    // composer.removePass(finalPass)
    // composer.removePass(earthquakePass)
    for (const physicsId of physicsIds) {
      physics.removeGeometry(physicsId);
    }
  });
  // return app
  // };
  return app; 
};



