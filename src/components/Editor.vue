<script setup lang="ts">
import { defineModel } from "vue"
import CodeMirror from "vue-codemirror6"

defineProps<{
  lang: any
  editorHeight: number
  extension: any
}>()

const value = defineModel<string>()
</script>

<template>
  <code-mirror
    :lang
    :tab="true"
    :wrap="true"
    :basic="true"
    :extensions="[extension]"
    v-model="value"
  />
</template>

<style scoped>
:deep(.cm-editor) {
  height: v-bind(editorHeight + "px");
}
</style>
