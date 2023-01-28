<template>
  <AceEditor
    width="100%"
    theme="xcode"
    :lang="language"
    :height="editorHeight"
    :options="{
      wrap: true,
      tabSize: 2,
      fontSize: 14,
      showGutter: true,
      enableSnippets: true,
      showLineNumbers: true,
      showPrintMargin: false,
      highlightActiveLine: true,
      enableLiveAutocompletion: true,
      enableBasicAutocompletion: true
    }"
    :commands="[
      {
        name: 'save',
        bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
        exec: dataSubmit,
        readOnly: true
      }
    ]"
    v-model="content"
    @init="editorInit"
  />
</template>

<script>
import { EventBus } from "@/main";
import AceEditor from "vuejs-ace-editor";

export default {
  components: {
    AceEditor
  },
  props: {
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    editorHeight: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      content: this.code
    };
  },
  mounted() {
    EventBus.$on("run-code", () => {
      EventBus.$emit("code-content", this.content, this.language);
    });
  },
  methods: {
    dataSubmit(e) {
      EventBus.$emit("code-content", e.getValue(), this.language);
    },
    editorInit() {
      require("brace/ext/language_tools");
      require("brace/theme/xcode");

      if (this.language === "html") {
        require("brace/mode/html");
        require("brace/snippets/html");
      } else if (this.language === "css") {
        require("brace/mode/css");
        require("brace/snippets/css");
      } else {
        require("brace/mode/javascript");
        require("brace/snippets/javascript");
      }
    }
  }
};
</script>
