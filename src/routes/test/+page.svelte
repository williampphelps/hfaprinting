<!-- <script>
    import { onMount } from "svelte";
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

    let canvas;

    onMount(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer({ alpha: true});
        renderer.setSize( canvas.clientWidth, canvas.clientHeight );
        canvas.appendChild( renderer.domElement );

        let frame;

        const loader = new GLTFLoader();

        let picLoader = new THREE.TextureLoader().load('https://ik.imagekit.io/szheqbces/tr:w-1500/6477e16e7f08e84fa467d0f7/cb7036c4-ee97-4cf7-bb4f-993830fc32d7');
        picLoader.colorSpace = THREE.SRGBColorSpace
        picLoader.flipY = false;

        loader.load('/assets/room.gltf', function ( gltf ) {

            frame = gltf.scene;
            scene.add( frame );

            frame.rotation.z = 1.5708;
            frame.rotation.y = 1.5708;

            frame.children[0].children[1].material.map = picLoader;

        }, undefined, function ( error ) {

            console.error( error );

        } );

        camera.position.z = 0.5;
        camera.position.y = 0;

        const controls = new OrbitControls( camera, renderer.domElement );

        // add light
        const spotLight = new THREE.SpotLight( 0xffffff, 2 );
        spotLight.position.set( 1, 1, -1 );
        scene.add(spotLight);

        const spotLight1 = new THREE.SpotLight( 0xffffff, 2 );
        spotLight1.position.set( -1, 1, 1 );
        scene.add(spotLight1);

        function animate() {
            requestAnimationFrame( animate );

            controls.update();

            renderer.render( scene, camera );
        }

        animate();
    })

    
</script>
<div class='h-full w-full' bind:this={canvas}>
</div> -->
