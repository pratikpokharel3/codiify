<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { html } from "@codemirror/lang-html"
import { css } from "@codemirror/lang-css"
import { javascript } from "@codemirror/lang-javascript"
import { oneDark } from "@codemirror/theme-one-dark"
import { useDark, useToggle } from "@vueuse/core"

import Modal from "./components/Modal.vue"
import Editor from "./components/Editor.vue"

const htmlContent = ref(`<!-- HTML Content -->
<h2>Welcome to Codiify!!</h2>
<p>Test your HTML, CSS, and JavaScript code with our online playground editor.</p>
<p>Put your idea and creativity at best and build something great.</p>

<div id="message"></div>
`)

const cssContent = ref(`/*CSS Rules*/
h2 {
  margin: 0;
}

h2+p {
  margin: 0.5rem 0 0 0;
}

p+p {
  margin-top: 0;
}

#message {
  font-size: 1.2rem;
}`)

const jsContent = ref(`//JavaScript Code
let message = document.querySelector('#message')
message.innerText = 'Happy Coding...'
`)

const modalState = ref(true)
const selectedEditor = ref("html")
const editorHeight = ref(0)
const iFrameContent = ref("")

const isDark = useDark({ initialValue: "dark" })
const toggleDark = useToggle(isDark)

onMounted(() => {
  const appbar = document.getElementById("appbar")

  if (!appbar) {
    return
  }

  editorHeight.value = window.innerHeight - appbar.clientHeight

  if (window.innerWidth < 1024) {
    editorHeight.value /= 2
  }

  executeCode()
})

const editorExtensions = computed(() => {
  return isDark.value ? [oneDark] : []
})

function executeCode() {
  iFrameContent.value = `
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:100,300,400,500,700,900">
    <style>
      body {
        font-family: Nunito, sans-serif;
      }
      ${cssContent.value}
    </style>
  </head>
  <body>
    ${htmlContent.value}

    <script>
      ${jsContent.value}
    <\/script>
  </body>
</html>
`
}
</script>

<template>
  <Modal @close="modalState = false" v-if="modalState" />

  <div class="flex min-h-screen flex-col lg:grid lg:grid-cols-2">
    <div class="border-r">
      <div
        id="appbar"
        class="flex justify-between bg-primary py-0.5 pl-5 pr-3 text-gray-300 dark:bg-gray-700"
      >
        <div class="flex">
          <button
            type="button"
            class="p-2.5 hover:cursor-pointer"
            :class="{ 'font-semibold text-white': selectedEditor === 'html' }"
            @click="selectedEditor = 'html'"
          >
            HTML
          </button>

          <button
            type="button"
            class="p-2.5 hover:cursor-pointer"
            :class="{ 'font-semibold text-white': selectedEditor === 'css' }"
            @click="selectedEditor = 'css'"
          >
            CSS
          </button>

          <button
            type="button"
            class="p-2.5 hover:cursor-pointer"
            :class="{ 'font-semibold text-white': selectedEditor === 'js' }"
            @click="selectedEditor = 'js'"
          >
            JavaScript
          </button>
        </div>

        <div class="flex items-center gap-x-6">
          <button
            type="button"
            class="hover:bg-secondary rounded-full p-2 dark:bg-gray-600 dark:text-white"
            @click="toggleDark()"
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Switch Theme</title>
              <path
                d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z"
              />
            </svg>
          </button>

          <button
            type="button"
            class="bg-secondary rounded-xl px-6 py-2 text-sm font-semibold text-white dark:bg-gray-600"
            @click="executeCode"
          >
            Run
          </button>
        </div>
      </div>

      <Editor
        :lang="html()"
        :editor-height="editorHeight"
        :extension="editorExtensions"
        v-model="htmlContent"
        v-show="selectedEditor === 'html'"
      />

      <Editor
        :lang="css()"
        :editor-height="editorHeight"
        :extension="editorExtensions"
        v-model="cssContent"
        v-show="selectedEditor === 'css'"
      />

      <Editor
        :lang="javascript()"
        :editor-height="editorHeight"
        :extension="editorExtensions"
        v-model="jsContent"
        v-show="selectedEditor === 'js'"
      />
    </div>

    <div class="flex grow flex-col border-t px-2 lg:border-0">
      <iframe class="grow" :srcDoc="iFrameContent"></iframe>
    </div>
  </div>
</template>
