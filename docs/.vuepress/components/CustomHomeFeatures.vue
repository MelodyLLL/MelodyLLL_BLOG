<script setup>
import { ref } from 'vue';
import { withBase } from '@vuepress/client';
const dd = ref('/images/image2.jpg');
const props = defineProps({});
</script>
<!-- horizontal -->
<template>
	<!-- <h4>Horizontal Flip</h4> -->
	<div class="flip_wrapper">
		<div class="flip">
			<div
				class="front"
				style="
					background-image: url(https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb);
				"
			>
				<h1 class="text-shadow">Welcome</h1>
			</div>
			<div class="back">
				<h2>我是谁</h2>
				<p>互联网浪潮末端挣扎的不知名码农</p>
			</div>
		</div>
		<div class="flip">
			<div
				class="front"
				style="
					background-image: url(https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb);
				"
			>
				<h1 class="text-shadow">To my</h1>
			</div>
			<div class="back">
				<h2>我在哪</h2>
				<p>广州，某公司就职的5年+前端开发</p>
			</div>
		</div>
		<div class="flip flip-vertical oneline">
			<div
				class="front"
				style="
					background-image: url(https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb);
          /* background-image: dd; */
				"
			>
				<h1 class="text-shadow">Zone</h1>
			</div>
			<div class="back" style="display: flex; justify-content: center">
				<h2
					style="
						writing-mode: tb-rl;
						border-right: 1px solid var(--c-border);
						border-bottom: none;
					"
				>
					联系我
				</h2>
				<img
					:src="$withBase('/images/WechatIMG67.jpeg')"
					alt="wechat
          "
				/>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
h1 {
	font-size: 2.2em;
}

// base
.flip_wrapper {
	color: #f0f0f0;
	display: flex;
	gap: 1rem;
	padding: 1.2rem 0;
	margin-top: 2.5rem;
	flex-wrap: wrap;

	img {
		width: auto;
		height: 180px;
		object-fit: contain;
		cursor: pointer;
		transition: all 0.6s;
		&:hover {
			transform: scale(1.6);
		}
	}
	.oneline {
		// flex-basis: 100%;
	}
	.flip {
		// flex: 1;
		height: 100%;
		min-width: 200px;
		position: relative;
		> .front,
		> .back {
			display: block;
			transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
			transition-duration: 1.5s;
			transition-property: transform, opacity;
		}
		> .front {
			transform: rotateY(0deg);
		}
		> .back {
			position: absolute;
			opacity: 0;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			transform: rotateY(-180deg);
		}
		&:hover {
			> .front {
				transform: rotateY(180deg);
			}
			> .back {
				opacity: 1;
				transform: rotateY(0deg);
			}
		}
		&.flip-vertical {
			> .back {
				transform: rotateX(-180deg);
			}
			&:hover {
				> .front {
					transform: rotateX(180deg);
				}
				> .back {
					transform: rotateX(0deg);
				}
			}
		}
	}

	// custom
	.flip {
		position: relative;
		display: inline-block;
		// margin-bottom: 1em;
		flex: 1;
		> .front {
			display: block;
			overflow: hidden;
			color: white;
			background-size: cover !important;
			background-position: center !important;
			height: 220px;
			padding: 1em 2em;
			background: #313131;
			border-radius: 10px;
		}
		> .back {
			background: #313131;
			padding: 2em 2em;
			box-sizing: border-box;
			border-radius: 10px;
			p {
				font-size: 0.9125rem;
				line-height: 160%;
				color: #999;
			}
		}
	}
}

.text-shadow {
	text-shadow: 1px 1px rgba(0, 0, 0, 0.04), 2px 2px rgba(0, 0, 0, 0.04),
		3px 3px rgba(0, 0, 0, 0.04), 4px 4px rgba(0, 0, 0, 0.04),
		0.125rem 0.125rem rgba(0, 0, 0, 0.04), 6px 6px rgba(0, 0, 0, 0.04),
		7px 7px rgba(0, 0, 0, 0.04), 8px 8px rgba(0, 0, 0, 0.04),
		9px 9px rgba(0, 0, 0, 0.04), 0.3125rem 0.3125rem rgba(0, 0, 0, 0.04),
		11px 11px rgba(0, 0, 0, 0.04), 12px 12px rgba(0, 0, 0, 0.04),
		13px 13px rgba(0, 0, 0, 0.04), 14px 14px rgba(0, 0, 0, 0.04),
		0.625rem 0.625rem rgba(0, 0, 0, 0.04), 16px 16px rgba(0, 0, 0, 0.04),
		17px 17px rgba(0, 0, 0, 0.04), 18px 18px rgba(0, 0, 0, 0.04),
		19px 19px rgba(0, 0, 0, 0.04), 1.25rem 1.25rem rgba(0, 0, 0, 0.04);
}
</style>
