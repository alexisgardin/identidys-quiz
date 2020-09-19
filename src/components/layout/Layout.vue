<template>
  <v-app id="inspire">
    <v-content align="start" style="padding: 20px">
      <v-container fluid align="start">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" align="center">
            <v-img :src="image" max-width="800px"></v-img>
          </v-col>
          <router-view style="max-width: 100vw" class="view one" />
        </v-row>
      </v-container>
    </v-content>
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
  image = require("@/assets/logo_big.png");
}
</script>
