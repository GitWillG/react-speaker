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
  
const baseUrl = import.meta.url.replace(/(\/)[^\/\/]*$/, '$1')

let reactWoofer;
let reactMid;

let beatFactorBass;
let beatFactorHi;
let audio;
let elapsedTime;

export default (e) => {
  const app = useApp()
  app.name = 'react-Speaker'
  const cameraManager = useCameraManager();
  // const gl = useInternals().renderer
  // const physics = usePhysics()
  // gl.outputEncoding = THREE.sRGBEncoding
 
  };








  //let physicsIds = [];  ->CLEAN
  (async () => {
    const u = `${baseUrl}react-Speaker.glb`;
    let o = await new Promise((accept, reject) => {
      const {gltfLoader} = useLoaders();
      gltfLoader.load(u, accept, function onprogress() {}, reject);
    });

    //shake
    // const {animations} = o;
    // o = o.scene;
    // app.add(o);


    //   localVector.setFromMatrixPosition(o.matrixWorld);
    //   cameraManager.addShake(localVector, 0.2, 30, 500);
    

    // const _shake = () => {
    //   _shake()
    // }
  });


  // alt loading method
  // const speakerInfo = {
  //   fileName: 'speaker.glb',
  //   // filePath: baseUrl + './',
  // }
  // const neonClub = loadModel(neonClubInfo)

  // // then promises 
  // // Promise.all([neonClub]).then((values) => {
  // //   values.forEach((model) => {
  // //     app.add(model)
  // //   })
  // // })
  // const audioTrackInformation = {
  //   source: baseUrl + 'tracks/music.wav',
  //   autoPlay: true,
  //   // currentTime: 100.2,
  // }

  //get music ->CLEAN
  document.body.onkeyup = (e) => {
    if (e.code === 'Digit1') {
      audio = getAudio({ createOnCall: false })
      createAudio(audioTrackInformation)
    }
  }
  
  //play  ->CLEAN
  document.body.onkeyup = (e) => {
    if (e.code === 'Digit2') {
      
        if (audio.paused) {
          audio.play()
        }
      
      createAudio(audioTrackInformation)
    }
  }
  //pause music ->CLEAN
  document.body.onkeyup = (e) => {
    if (e.code === 'Digit3') {
      if (audio.paused !== undefined) {
        
          audio.pause()
        
      }
      createAudio(audioTrackInformation)
    }
  }


//cleanup
  useCleanup(() => {
    // composer.removePass(finalPass)
    // composer.removePass(earthquakePass)
    for (const physicsId of physicsIds) {
      physics.removeGeometry(physicsId)
    }
  })
  return app
};