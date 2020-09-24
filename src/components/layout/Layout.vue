<template>
  <v-app id="inspire">
    <v-main align="start" style="padding: 20px">
      <v-container fluid align="start">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" align="center">
            <v-img :src="image" max-width="300px"></v-img>
          </v-col>
          <router-view style="max-width: 100vw" class="view one" />
        </v-row>
      </v-container>
    </v-main>
    <v-footer  padless>
      <v-card flat tile class=" lighten-1 text-center" style="width: 100vw">
        <v-card-text>
          {{ new Date().getFullYear() }} — <strong>Identidys Online est la version numérique du questionnaire disponible sur <a href="https://www.identidys.com" target="_blank">identidys.fr</a> </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  name: "Layout"

  // Toutes les options de composant sont autorisées ici.
})
export default class Layout extends Vue {
  image = require("@/assets/logo.png");
  icons = [
    {
      icon: "mdi-instagram",
      link: "https://www.instagram.com/identidys_echelle_reperage_dys/?hl=fr-ca"
    },
    {
      icon: "mdi-youtube",
      link: "https://www.youtube.com/channel/UCvFJprs2zEJPLu2vNuUkFcw"
    },
    {
      icon: "mdi-web",
      link: "https://www.identidys.com/"
    }
  ];

}
</script>
