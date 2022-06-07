import * as THREE from 'three';
import metaversefile from 'metaversefile';

import {
  createAudio,
  getAudio,
  getFrequenciesByRange,
  getThreshold,
  logMood,
  updateMoodArray,
} from './audio/index.js'

const { useApp, useLoaders, useFrame, useCleanup, usePhysics, useInternals } =
  metaversefile
  
const baseUrl = import.meta.url.replace(/(\/)[^\/\\]*$/, '$1')

let reactWoofer;
let reactMid;

let beatFactorBass;
let beatFactorHi;
let audio;
let elapsedTime;

export default (e) => {
  const app = useApp()
  app.name = 'react-Speaker'
  const physics = usePhysics();
  

  
  const loadModel = (params) => {
    return new Promise((resolve, reject) => {
      const { gltfLoader } = useLoaders()
      const { dracoLoader } = useLoaders()
      gltfLoader.setDRACOLoader(dracoLoader).setCrossOrigin('anonymous')

      gltfLoader.load(params.filePath + params.fileName, (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            if (child.material.name === 'Woofer'){
              console.log("found mesh");

            }

          }
        })
        const physicsId = physics.addGeometry(gltf.scene)
        physicsIds.push(physicsId)
        // gltf.scene.position.set(0, 0, 0)
        // gltf.scene.rotation.set(Math.PI, 0, 0)
        // gltf.scene.updateMatrixWorld()
        resolve(gltf.scene)
      })
    })
  }
  const speakerInfo = {
    fileName: 'react-Speaker.glb',
    filePath: baseUrl,
  }
  const reactSpeaker = loadModel(speakerInfo)

  Promise.all([reactSpeaker]).then((values) => {
    values.forEach((model) => {
      app.add(model)
    })
  })

     //cleanup
  useCleanup(() => {
    // composer.removePass(finalPass)
    // composer.removePass(earthquakePass)
    for (const physicsId of physicsIds) {
      physics.removeGeometry(physicsId)
    }
  })
    return app; 
  
}


//  // ->CLEAN
//  let physicsIds = [];
//  (async () => {
//   const u = `${baseUrl}react-Speaker.glb`;
//   let o = await new Promise((accept, reject) => {
//     const {gltfLoader} = useLoaders();
//     gltfLoader.load(u, accept, function onprogress() {}, reject);
//   });
//   console.log("glb data", o);
  
//   const physicsId = physics.addGeometry(o);
//   physicsIds.push(physicsId);
//   })();
  
  
 
//   // return app
//   // };



   // for screenshake later
  //const cameraManager = useCameraManager();

  // let activated = false;
  // let activateCb = null;
  
  // const audioTrackInformation = {
  //   source: baseUrl + 'music/dungeon.mp3',
  //   autoPlay: true,
  // }

  // // seperate controls for testing
  // //get music ->CLEAN
  // document.body.onkeyup = (e) => {
  //   if (e.code === 'Digit1') {
  //     audio = getAudio({ createOnCall: false })
  //     createAudio(audioTrackInformation);
  //     console.log("get audio");
  //   }
  // }
  // //play  ->CLEAN
  // document.body.onkeyup = (e) => {
  //   if (e.code === 'Digit2') {
  //       if (audio.paused) {
  //         audio.play()
  //         console.log("play audio");
  //       }
  //   }
  // }
  // //pause music ->CLEAN
  // document.body.onkeyup = (e) => {
  //   if (e.code === 'Digit3') {
  //     if (audio.paused !== undefined) {
  //         audio.pause()
  //         console.log("pause audio");
  //     }
  //   }
  // }
  // activateCb = () => {
  //   activated = !activated;

  //   if (activated) {
  //      audio.play();
      
  //     _shake();
  //   } else {
  //     audio.pause();
  //   }
  // };

  //screen shake method for heavy bass
  // const {animations} = o;
  // o = o.scene;
  // app.add(o);


  //   localVector.setFromMatrixPosition(o.matrixWorld);
  //   cameraManager.addShake(localVector, 0.2, 30, 500);
  

  // const _shake = () => {
  //   _shake()
  // }