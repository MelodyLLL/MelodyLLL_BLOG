---
lastUpdated: false
contributors: false
anchor: false
---

# <center>留言板子</center>

# <center>富强、民主、文明、和谐</center>

# <center>自由、平等、公正、法治</center>

# <center>爱国、敬业、诚信、友善</center>

<CommentService :darkmode="isDarkMode" />

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from 'vue';

const isDarkMode = ref(false);
let observer;
onMounted(() => {
  const html = document.querySelector('html') as HTMLElement;
  isDarkMode.value = html.classList.contains('dark');
  // watch theme change
  observer = new MutationObserver(() => {
    isDarkMode.value = html.classList.contains('dark');
  });
  observer.observe(html, {
    attributeFilter: ['class'],
    attributes: true,
  });
});
onBeforeUnmount(() => {
  observer.disconnect();
});
console.log(isDarkMode,'???');

// const theme = computed(() => {
//  return this.$theme.palette.themeColors.primary;
// });
</script>
