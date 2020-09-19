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
      <v-btn color="primary" elevation="8" fab dark class="mr-4" @click="reset">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
      <v-btn
        rounded
        width="250"
        :disabled="!allRespond()"
        height="50"
        color="primary"
        elevation="8"
        @click="goToResult"
        >Voir les résultats
      </v-btn>
    </div>
  </v-row>
</template>
<style lang="scss"></style>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Quiz, Subject } from "@/model/ResponseModel";

@Component({
  name: "QuizComponent"
  // Toutes les options de composant sont autorisées ici.
})
export default class QuizComponent extends Vue {
  show = false;
  image = require("@/assets/logo_big.png");

  data: Quiz = this.$store.state.quizzes;

  computeNumberOfResponse(subject: Subject) {
    return subject.questions.filter(value => value.chosenResponse != undefined)
      .length;
  }

  allRespond() {
    return (
      this.data.subjects.filter(
        subject =>
          subject.questions.filter(value => value.chosenResponse == undefined)
            .length == 0
      ).length === this.data.subjects.length
    );
  }

  reset() {
    for (const subject of this.data.subjects) {
      for (const question of subject.questions) {
        question.chosenResponse = undefined;
      }
    }
  }

  goToResult() {
    //Compute score
    for (const subject of this.data.subjects) {
      for (const question of subject.questions) {
        if (question.chosenResponse) {
          if (question.linkTo) {
            const link = subject.questions.find(v => question.linkTo === v.id);
            subject.disable = question.chosenResponse !== link!.chosenResponse;
          }
          subject.score += question.chosenResponse;
        } else continue;
      }
    }
    this.$router.push("result");
  }
}
</script>
