<template>
  <v-app>
    <v-main>
      <v-col cols="12" lg="6" id="code-editor-section" class="pa-0">
        <v-row no-gutters>
          <v-col cols="9" sm="7">
            <v-tabs dark background-color="primary" v-model="tabIdx">
              <v-tab>HTML</v-tab>
              <v-tab>CSS</v-tab>
              <v-tab>JS</v-tab>
            </v-tabs>
          </v-col>

          <v-col
            sm="5"
            cols="3"
            class="primary d-flex align-center justify-center py-2 justify-sm-end py-sm-0 pr-sm-3"
          >
            <v-chip small>
              <span v-if="isMobileView" @click="runCode">Run Code</span>
              <template v-else>Press CTRL + S to save</template>
            </v-chip>
          </v-col>

          <v-col cols="12">
            <v-tabs-items v-model="tabIdx">
              <v-tab-item>
                <code-editor
                  language="html"
                  :code="htmlContent"
                  :editorHeight="codeEditorHeight"
                ></code-editor>
              </v-tab-item>

              <v-tab-item>
                <code-editor
                  language="css"
                  :code="cssContent"
                  :editorHeight="codeEditorHeight"
                ></code-editor>
              </v-tab-item>

              <v-tab-item>
                <code-editor
                  language="javascript"
                  :code="jsContent"
                  :editorHeight="codeEditorHeight"
                ></code-editor>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        lg="6"
        cols="12"
        class="d-flex flex-column pa-0"
        :style="{ height: equalAreaHeight + 'px' }"
      >
        <div class="output-header px-4">
          <span class="title">Output Screen</span>

          <v-dialog v-model="dialog" width="320">
            <template v-slot:activator="{ on, attrs }">
              <svg
                v-on="on"
                v-bind="attrs"
                viewBox="0 0 24 24"
                style="width: 24px; height: 24px"
              >
                <path
                  fill="currentColor"
                  d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                />
              </svg>
            </template>

            <v-card class="py-2 px-3 body-2">
              <div class="d-flex justify-space-between align-center">
                <span class="title">About</span>

                <svg
                  class="show_hover"
                  viewBox="0 0 24 24"
                  style="width: 24px; height: 24px"
                  @click="dialog = false"
                >
                  <path
                    fill="currentColor"
                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                  />
                </svg>
              </div>

              <div class="divider"></div>

              <div class="mt-3">
                <strong>Codiify</strong> is a place to quickly test your HTML,
                CSS, and JS code with our online editor. Put your idea
                and creativity at best and build something great.
              </div>

              <div class="text-center mt-3 pb-1">
                © Codiify, {{ new Date().getFullYear() }}
              </div>
            </v-card>
          </v-dialog>
        </div>

        <iframe
          title="output"
          frameBorder="0"
          sandbox="allow-scripts"
          class="flex-grow-1 px-4 mt-4"
          :srcDoc="outputContent"
        ></iframe>
      </v-col>
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */
import { EventBus } from "@/main";

export default {
  name: "App",
  components: {
    CodeEditor: () => import("./components/CodeEditor.vue")
  },
  data: () => ({
    tabIdx: null,
    htmlContent: `<!-- HTML Content -->
<h2>Welcome to Codiify..!!</h2>
<p>Test your HTML, CSS, and JS code with our online editor.</p>
<p>Put your idea and creativity at best and build something great.</p>

<div id="message"></div>`,
    cssContent: `/*CSS Rules*/
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
}`,
    jsContent: `//JS Code
let message = document.querySelector('#message')
message.innerText = '♥ Happy Coding ♥'`,
    outputContent: "",
    equalAreaHeight: 100,
    codeEditorHeight: 500,
    isMobileView: true,
    dialog: false
  }),
  beforeDestroy() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });

    this.setSrcDoc();

    EventBus.$on("code-content", (content, lang) => {
      if (lang == "html") {
        this.htmlContent = content;
      } else if (lang === "css") {
        this.cssContent = content;
      } else {
        this.jsContent = content;
      }

      this.setSrcDoc();
    });
  },
  methods: {
    onResize() {
      this.isMobileView = window.innerWidth < 992;

      if (this.isMobileView) {
        this.equalAreaHeight = Math.round(window.innerHeight / 2) - 1;
        this.codeEditorHeight = Math.round(window.innerHeight / 2) - 88;
      } else {
        this.equalAreaHeight = window.innerHeight;
        this.codeEditorHeight = window.innerHeight - 48;
      }
    },
    setSrcDoc() {
      this.outputContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
            <style>
              body {
                margin: 0;
                padding: 0;
                line-height: 1.5;
                font-family: "Roboto";
              }
              ${this.cssContent}
            </style>
          </head>
          <body>
            ${this.htmlContent}
            <script>${this.jsContent}<\/script>
          </body>
        </html>
      `;
    },
    runCode() {
      EventBus.$emit("run-code");
    }
  }
};
</script>

<style>
@media (min-width: 992px) {
  .v-main__wrap {
    display: flex;
  }
}

#code-editor-section {
  border-right: 1px solid #dfdfdf;
}

.output-header {
  height: 48px;
  display: flex;
  color: white;
  align-items: center;
  background-color: #2e659b;
  justify-content: space-between;
  border-bottom: 1px solid #dfdfdf;
}
</style>
