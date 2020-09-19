<template>
  <!--<p v-for="item in Object.keys(quizzes)" :key="item">{{ item }}</p> -->
  <v-row justify="center" align="center">
    <v-col
      cols="12"
      align="center"
      v-bind:key="index"
      v-for="(sub, index) in data.subjects"
    >
      <v-col cols="12" sm="9" md="6" lg="5" xl="4" align="center">
        <v-card class="mx-auto" elevation="6">
          <v-img :contain="true" :src="sub.image" width="100%"></v-img>

          <v-card-title style="font-size: 1.10rem">
            {{ sub.name }}
          </v-card-title>
          <v-col
            v-for="(question, indexQ) in sub.questions"
            v-bind:key="question.id"
            cols="12"
            align="center"
          >
            <p>{{ question.question }}</p>
            <v-row justify="center" align="center">
              <v-radio-group
                row
                v-model="question.chosenResponse"
                :mandatory="false"
              >
                <v-radio
                  v-for="(choice, index2) in question.responses"
                  :label="choice.response"
                  v-bind:key="index2"
                  v-model="choice.score"
                ></v-radio>
              </v-radio-group>
            </v-row>
            <v-textarea
              v-model="question.comment"
              auto-grow
              outlined
              color="primary"
              label="Information additionnel"
              placeholder="Falcultatif"
              rows="3"
            ></v-textarea>

            <v-divider v-if="indexQ !== sub.questions.length - 1"></v-divider>
          </v-col>

          <v-divider></v-divider>
          <v-card-text>
            <v-alert
              v-if="computeNumberOfResponse(sub) == sub.questions.length"
              type="success"
              dense
              text
            >
              Toutes les questions de cette partie ont une réponse
            </v-alert>
            <v-alert v-else type="error" dense text>
              Il reste des questions sans réponses !
              {{ computeNumberOfResponse(sub) + "/" + sub.questions.length }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-col>
    <div>
      <v-btn color="primary" elevation="8" fab dark class="mr-3" @click="reset">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
      <v-btn rounded width="300" height="50" color="primary" dark elevation="8"
        >Voir les résultats
      </v-btn>
    </div>
  </v-row>
</template>
<style lang="scss"></style>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Quiz, ResponseModel, Subject } from "@/model/ResponseModel";

@Component({
  name: "QuizComponent"
  // Toutes les options de composant sont autorisées ici.
})
export default class QuizComponent extends Vue {
  show = false;
  image = require("@/assets/logo_big.png");
  responses: ResponseModel[] = [
    { response: "Oui", id: 1, score: 2 },
    {
      response: "Rarement",
      id: 2,
      score: 0.5
    },
    { response: "Non", id: 3, score: 0 }
  ];
  data: Quiz = {
    subjects: [
      {
        name: "ATTENTION / CONCENTRATION",
        image: require("@/assets/card/kid1.jpg"),
        questions: [
          {
            responses: this.responses,
            question:
              "Votre enfant a du mal à soutenir son attention (rester concentré longtemps également sur une activité de loisir) ET/OU  Il a tendance à se désinvestir de tâches nécessitant un effort mental soutenu (y compris en dehors du scolaire, ex. jeux de société).",
            id: 1,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant est facilement distrait par ce qui peut se passer autour de lui. ",
            id: 2,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant oublie fréquemment certaines choses de la vie quotidienne (consignes, cahiers, clefs...) ET/OU Il perd régulièrement des objets ou des affaires nécessaires à son travail ou à ses activités (sac, trousse, portable...). ",
            id: 3,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Les difficultés attentionnelles sont observées dans la sphère scolaire (école et devoirs). ",
            id: 4,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Les difficultés attentionnelles sont observées dans la sphère privée (loisirs, activités quotidiennes). ",
            id: 5,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Les difficultés attentionnelles sont présentes depuis plus de 6 mois. ",
            id: 6,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant a des difficultés à attendre son tour (tour de parole, self-service, cantine, jeux de société...). ",
            id: 7,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant se lève souvent dans des situations où il est censé rester calme et assis (en classe, cinéma, jeux de société) ET/OU  Il est constamment en mouvement (bouge beaucoup) à l’école et/ou dans les activités de loisir.",
            id: 8,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant a tendance à agir plus vite qu’il ne réfléchit, il répond aux questions avant qu’elles soient complètement posées.   ",
            id: 9,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant a du mal à aller se coucher ou s’endormir à cause de son agitation / excitation ET/OU  Il ne semble jamais être fatigué et manifeste régulièrement le besoin d’être en activité (y compris lors des repas). ",
            id: 10,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Son agitation / son impulsivité est présente sur la sphère scolaire (Ecole et devoirs) depuis plus de 6 mois.",
            id: 11,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Son agitation / son impulsivité est présente sur la sphère privée (loisirs, activités quotidiennes) depuis plus de 6 mois.  ",
            id: 12,
            score: 0
          }
        ]
      },
      {
        name: "LANGAGE ORAL",
        image: require("@/assets/card/kid2.jpg"),
        questions: [
          {
            responses: this.responses,
            question:
              "Votre enfant a des difficultés pour comprendre le sens des conversations. ",
            id: 13,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant montre des difficultés pour trouver les mots justes (manque du mot). ",
            id: 14,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant a des difficultés pour résumer ou raconter une histoire de manière cohérente. ",
            id: 15,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant montre des difficultés pour s’exprimer (on ne le comprend pas toujours). ",
            id: 16,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant parvient davantage à réaliser ses exercices lorsque qu’on lui reformule les consignes. ",
            id: 17,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant a des difficultés pour structurer correctement ses phrases. ",
            id: 18,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Le langage a mis du temps à se mettre en place (Votre enfant ne faisait pas de phrase à l’entrée en Maternelle ET/OU on ne le comprenait pas). ",
            id: 19,
            score: 0
          },
          {
            responses: this.responses,
            question: "Votre enfant n’a pas un vocabulaire étendu. ",
            id: 20,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant a des difficultés pour conjuguer les verbes. ",
            id: 21,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant a des difficultés dans ses relations avec les autres enfants de son âge.",
            id: 22,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant était colérique ou pleurait souvent dans la petite enfance. ",
            id: 23,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant a tendance à procéder par mimétisme en classe (à se calquer sur ce que font les autres).  ",
            id: 24,
            score: 0
          }
        ]
      },
      {
        name: "LANGAGE ECRIT",
        image: require("@/assets/card/kid3.jpg"),
        questions: [
          {
            responses: this.responses,
            question:
              "Votre enfant montre des difficultés pour comprendre ce qu’il lit. ",
            id: 25,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Il est régulièrement nécessaire de lui reformuler ou de lui lire les consignes. ",
            id: 26,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant parvient davantage à réaliser ses exercices lorsque qu’on lui reformule les consignes. ",
            id: 27,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant montre d’importantes difficultés pour apprendre ses tables de multiplication. ",
            id: 28,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Il faut régulièrement insister sur cet apprentissage mais dès le lendemain il oublie ce qu’il a appris la veille. ",
            id: 29,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant se montre lent dans l’activité de copie (au tableau) ou lors de la prise de notes. ",
            id: 30,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant fait de nombreuses fautes d’orthographe, et peut écrire un même mot de différentes manières. ",
            id: 31,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant a des difficultés en écriture (mauvaise qualité) mais parvient à écrire correctement lorsqu’on lui laisse le temps. ",
            id: 32,
            score: 0
          },
          {
            responses: this.responses,
            question: "Votre enfant n’aime pas lire  ET/OU  Il ne lit pas.",
            id: 33,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant ne parvient pas bien à se repérer dans le temps (gestion du temps qui passe, confond les jours, les mois). ",
            id: 34,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant ne parvient pas à prendre ses cours en entier. ",
            id: 35,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant ne parvient pas à relire ses cours car la qualité graphique est très mauvaise. ",
            id: 36,
            score: 0
          }
        ]
      },
      {
        name: "MOTRICITE / REPERAGE SPATIAL",
        image: require("@/assets/card/kid4.jpg"),
        questions: [
          {
            responses: this.responses,
            question:
              "Votre enfant a des difficultés en géométrie (repérage dans l’espace ou manque de précision). ",
            id: 37,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant a des difficultés en Mathématiques (pose d’opérations, lecture d’un tableau à double entrées). ",
            id: 38,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant a des difficultés dans les activités sportives (demandant de l’équilibre et une bonne coordination). ",
            id: 39,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant montre des difficultés dans l’utilisation de certains outils scolaires (compas, règles...). ",
            id: 40,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant montre des difficultés dans l’utilisation de certains outils au quotidien (couteau, fourchettes, bouteille...). ",
            id: 41,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant est maladroit lorsqu’il aide à la maison (se cogne, renverse les objets). ",
            id: 42,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant a des difficultés en écriture (mauvaise qualité) et ne parvient pas à écrire correctement y compris lorsqu’on lui laisse le temps. ",
            id: 43,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant montre des difficultés en motricité fine (faire ses lacets, boutonner, colorier, découper...). ",
            id: 44,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant montre des difficultés en motricité globale (courir, sauter, activités sportives...). ",
            id: 45,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant n’aime pas dessiner… (Quelles en sont les raisons selon lui ?).",
            id: 46,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant ne parvient pas bien à se repérer dans l’espace (perte de repère dans un lieu connu). ",
            id: 47,
            score: 0
          },
          {
            responses: this.responses,
            question:
              "Votre enfant montre des difficultés dans l’habillage (orientation des vêtements, aisance...). ",
            id: 48,
            score: 0
          }
        ]
      }
    ]
  };

  computeNumberOfResponse(subject: Subject) {
    return subject.questions.filter(value => value.chosenResponse != undefined)
      .length;
  }

  reset() {
    for (const subject of this.data.subjects) {
      for (const question of subject.questions) {
        question.chosenResponse = undefined;
      }
    }
  }
}
</script>
