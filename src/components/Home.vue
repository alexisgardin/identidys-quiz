<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" align="center">
      <v-btn
        class="heartbeat"
        rounded
        width="300"
        height="50"
        color="primary"
        dark
        elevation="8"
        @click="goToTest"
        >Démarrer le test
      </v-btn>
    </v-col>
  </v-row>
</template>
<style>
.heartbeat {
  -webkit-animation: heartbeat 3s ease-in-out 3s infinite both;
  animation: heartbeat 3s ease-in-out 3s infinite both;
}

@-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}

@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}
</style>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "Home",
  components: {}
  // Toutes les options de composant sont autorisées ici.
})
export default class Home extends Vue {
  image = require("@/assets/logo_big.png");

  goToTest() {
    this.$router.push("quiz");
  }
}
</script>
