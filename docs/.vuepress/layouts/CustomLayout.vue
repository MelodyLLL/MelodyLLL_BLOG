<script setup lang="ts">
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
// import HomeContent from "@theme/HomeContent.vue";
import HomeFooter from '@theme/HomeFooter.vue';
import HomeHero from '../components/CustomHomeHero.vue';
import HomeFeatures from '../components/CustomHomeFeatures.vue';
</script>

<template>
	<!-- <div class="background"></div> -->

	<!-- <div class="overlay"></div> -->
	<Layout class="background">
		<template #navbar-before>
			<!-- <SearchBox /> -->
		</template>
		<template #page>
			<main class="home">
				<HomeHero />
				<HomeFeatures />
				<HomeFooter />
			</main>
		</template>
		<!-- <template #page-content-bottom>
			<div class="my-footer">123</div>
		</template> -->
	</Layout>
</template>
<style scoped>
.background {
	/* width: 100vw;
	height: 100vh; */
	/* background-image: url('https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb');
	background-size: cover;
	background-position: center; */
}
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	/* width: 100vw;
	height: 100vh; */
	background-color: rgba(0, 0, 0, 0.1); /* 调整透明度 */
	pointer-events: none; /* 使薄纱不影响鼠标事件，使下层内容可点击 */
	z-index: 1; /* 保证薄纱在最顶层 */
}
</style>
