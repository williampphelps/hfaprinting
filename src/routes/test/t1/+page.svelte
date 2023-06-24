<script lang="ts">
	import { AmbientLight, OrbitControls, PerspectiveCamera } from '@threlte/core'
	import { GLTF } from '@threlte/extras'
</script>

<PerspectiveCamera position={{ x: 5, y: 2, z: 5 }} fov={25}>
	<OrbitControls autoRotate enableDamping />
</PerspectiveCamera>

<AmbientLight />

<GLTF url="/assets/room.gltf" />