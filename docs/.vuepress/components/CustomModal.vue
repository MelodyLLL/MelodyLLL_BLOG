<script setup>
import { ClientOnly } from '@vuepress/client';

const props = defineProps({
	show: Boolean,
});
</script>

<template>
		<Transition name="modal">
			<div v-if="show" class="modal-mask" @click="$emit('close')">
				<div class="modal-container">
					<div class="modal-header">
						<slot name="header">default header</slot>
					</div>

					<div class="modal-body">
						<slot name="body">default body</slot>
					</div>

					<div class="modal-footer">
						<!-- <slot name="footer">
              <button
                class="modal-default-button"
                @click="$emit('close')"
              >ok</button>
            </slot> -->
					</div>
				</div>
			</div>
		</Transition>
</template>

<style scoped lang="scss">
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	// transition: opacity 0.3s ease;
}

.modal-container {
	// color: #fff;
	width: 50%;
	height: 50%;
	padding: var(--c-padding);
	border: 1px solid;
	// height: 300px;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	margin: auto;
	margin-top: 4rem;
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
	box-shadow: 0 20px 10px rgba(0, 0, 0, 0.1);
	// display: flex;
	// justify-content: center;
	// align-items: center;
}

// .modal-container {
//   width: 300px;
//   margin: auto;
//   padding: 20px 30px;
//   background-color: #fff;
//   border-radius: 2px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
//   transition: all 0.3s ease;
// }

.modal-header h3 {
	margin-top: 0;
	color: var(--c-brand);
}

.modal-body {
	margin: 20px 0;
}

.modal-default-button {
	float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
	opacity: 0;
}

.modal-leave-to {
	opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>
