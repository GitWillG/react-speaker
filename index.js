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
//   const app = useApp();
//   app.name = 'react-Speaker';
//   const physics = usePhysics();
  
 
  
//  // ->CLEAN
//  let physicsIds = [];
//  (async () => {
//   const u = `${baseUrl}react-speaker.glb`;
//   console.log(u);
//   let o = await new Promise((accept, reject) => {
//     const {gltfLoader} = useLoaders();
//     gltfLoader.load(u, accept, function onprogress() {}, reject);
//   });
//   console.log("glb data", o.morphTargets, o);
//   const physicsId = physics.addGeometry(o);
//   physicsIds.push(physicsId);
//   })();
  
  
//   //cleanup
//   useCleanup(() => {
//     // composer.removePass(finalPass)
//     // composer.removePass(earthquakePass)
//     for (const physicsId of physicsIds) {
//       physics.removeGeometry(physicsId);
//     }
//   });
//   // return app
//   // };

  const app = useApp();
  let speaker = null;
  //let prop = null;
  const physics = usePhysics();
  const physicsIds = [];
  (async () => {
      const u = `${baseUrl}/react-speaker.glb`;
      speaker = await new Promise((accept, reject) => {
          const {gltfLoader} = useLoaders();
          gltfLoader.load(u, accept, function onprogress() {}, reject);
          
      });
      // fan.scene.traverse(o => {
      //   // if (o.isMesh) {
      //   //   console.log(o);
      //   // }
      //   if(o.name === 'Plane001') {  prop = o; }
      // });
      //fan.scene.position.y=1;
      speaker.scene.scale.set(1,1,1);
      //fan.scene.rotation.x = Math.PI/2;
      // group.add(fan.scene);
      app.add(speaker.scene);
      let physicsId;
      physicsId = physics.addGeometry(speaker.scene);
      physicsIds.push(physicsId)
      // const geometry = new THREE.CircleGeometry( 1, 32 );
      // const material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent:true, opacity:0.5, side: THREE.DoubleSide } );
      // const circle = new THREE.Mesh( geometry, material );
      // circle.rotation.x = Math.PI / 2;
      // circle.position.y = 0.1;
      // app.add( circle );
      app.updateMatrixWorld();


  })();

  
  

  // useFrame(( { timeStamp } ) => {
  //   if(prop){
  //     prop.rotation.x = -1.570799097288404; 
  //     prop.rotation.y += -1.4884504324181542; 
  //     prop.rotation.z = -3.141592653589793; 
  //   }
  //   app.updateMatrixWorld();
  // });

  
  useCleanup(() => {
    for (const physicsId of physicsIds) {
      physics.removeGeometry(physicsId);
    }
  });








  return app; 
};



