<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" lg="5" md="6" align="center">
      <h4 class="mb-5">
        Dites (par rapport à ce que vous pouvez observer chez votre enfant), si
        les situations rapportées se rencontrent :
      </h4>
      <p><strong style="font-weight:800">Oui</strong> - Très souvent</p>
      <p><strong style="font-weight:800">Rarement</strong> - Situations anecdotiques</p>
      <p><strong style="font-weight:800">Non</strong>- Jamais</p>
      <p>Ps. Vous êtes également libre d’y associer des commentaires afin de
        préciser vos réponses.</p>
    </v-col>
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
        >Démarrer le questionnaire
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12" align="center">
      <v-btn
        v-for="icon in icons"
        :key="icon.icon"
        class="mx-4"
        icon
        @click="open(icon.link)"
        :color="icon.color"
      >
        <v-icon size="30px">{{ icon.icon }}</v-icon>
      </v-btn>
    </v-col>

    <v-col
      cols="12"
      sm="12"
      lg="5"
      md="6"
      align="center"
      v-if="values.length > 0"
    >
      <v-data-table :headers="headers" :items="values" class="elevation-1">
        <template v-slot:item.date="{ item }">
          <span>{{ new Date(item.date).toLocaleString() }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            color="primary"
            rounded
            small
            class="mr-2"
            @click="setResult(item)"
          >
            Voir résultat
          </v-btn>
        </template>
      </v-data-table>

      <v-btn
        color="primary"
        small
        elevation="8"
        fab
        dark
        class="ma-4"
        @click="reset"
      >
        <v-icon>mdi-reload</v-icon>
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
  goToTest() {
    this.$router.push("quiz");
  }
  headers = [
    {
      text: "N°",
      align: "start",
      value: "id"
    },
    { text: "Date", value: "date" },
    { text: "Résultat", value: "actions", sortable: false }
  ];
  values = [];
  icons = [
    {
      icon: "mdi-instagram",
      link:
        "https://www.instagram.com/identidys_echelle_reperage_dys/?hl=fr-ca",
      color: "indigo"
    },
    {
      icon: "mdi-youtube",
      link: "https://www.youtube.com/channel/UCvFJprs2zEJPLu2vNuUkFcw",
      color: "red"
    },
    {
      icon: "mdi-web",
      link: "https://www.identidys.com/",
      color: "primary"
    }
  ];
  open(link: string) {
    window.open(link, "_blank");
  }

  mounted() {
    const item = localStorage.getItem("data");
    if (item) {
      this.values = JSON.parse(item);
    }
  }
  reset() {
    localStorage.setItem("data", JSON.stringify([]));
    this.values = [];
  }

  setResult(item: any) {
    this.$store.state.quizzes = item.data;
    this.$router.push("result");
  }
}
</script>
