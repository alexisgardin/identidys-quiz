<template>
  <v-row justify="center" align="center" v-if="data">
    <v-col align="center" cols="12">
      <vue-html2pdf
        :show-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="3000"
        filename="identidys_result"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        ref="html2Pdf"
      >
        <section
          slot="pdf-content"
          style="background-color: white"
          class="ma-8"
        >
          <v-row justify="center" align="center">
            <v-col cols="12" align="center" class="pa-0">
              <v-img :src="image" max-width="300px"></v-img>
            </v-col>
          </v-row>
          <section class="pdf-item">
            <v-row justify="center" align="center" class="pa-0">
              <v-col cols="12" align="center" class="pa-0">
                <div
                  v-for="n of chartOptions.length"
                  id="chart"
                  v-bind:key="n"
                  :set="
                    (color = computeColor(
                      data.subjects[n - 1].ranking,
                      data.subjects[n - 1].score
                    ))
                  "
                >
                  <apexchart
                    type="bar"
                    height="200"
                    :options="chartOptions[n - 1]"
                    :series="series[n - 1]"
                  ></apexchart>
                  <p v-if="!data.subjects[n - 1].disable">
                    Votre enfant a un score de
                    <b>{{ data.subjects[n - 1].score }}</b>
                    ce qui le situe dans la
                    <b :style="{ color: color.color }">
                      zone {{ color.name }}.</b
                    >
                  </p>
                  <p v-else style="color:red">
                    Cette sphère ne peut être calcuée
                  </p>
                </div>
              </v-col>
            </v-row>
            <v-divider style="margin: 15px 0px 15px 0px"></v-divider>
            <v-row
              justify="center"
              align="center"
              v-for="(sub, index) of data.subjects"
              v-bind:key="index"
            >
              <v-col cols="12" align="center" style="padding: 0">
                <!-- ugly, only for pdf generation purpose -->
                <h2 v-if="index === 0">Synthèse de vos commentaires</h2>
                <div style="width: 90%">
                  <h4>{{ sub.name }}</h4>
                  <div v-for="q of sub.questions" v-bind:key="q.id">
                    <v-card
                      v-if="q.comment"
                      class="mx-auto"
                      style="margin: 20px"
                      outlined
                    >
                      <v-card-text>
                        <b>{{ q.id + ") " + q.question }}</b>
                        <v-divider></v-divider>
                        {{ q.comment }}
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-divider style="margin: 15px 0px 15px 0px"></v-divider>
            <v-row justify="center" align="center">
              <v-col cols="12" align="center" style="padding: 0">
                <!-- ugly, only for pdf generation purpose -->
                <h2>Synthèse des résultats</h2>
                <v-col
                  cols="12"
                  align="center"
                  v-for="(obj, index) in dataResult"
                  v-bind:key="index"
                >
                  <p :style="{ color: obj.color }">
                    {{ obj.zone }} :
                    <span
                      style="color: black"
                      v-for="(cont, index) in obj.sub"
                      v-bind:key="index"
                      >{{ cont
                      }}<span v-if="index !== obj.sub.length - 1">
                        -
                      </span></span
                    >
                  </p>
                </v-col>
              </v-col>
            </v-row>
          </section>
        </section>
      </vue-html2pdf>
    </v-col>
    <v-row
      justify="center"
      cols="12"
      sm="12"
      align="center"
      style="z-index: 9999; position: fixed; bottom: 10vh; right: 10vw"
    >
      <v-btn
        rounded
        width="250"
        height="50"
        color="primary"
        elevation="8"
        @click="generateReport"
        style="margin: 5px"
        >Télécharger les résultats
      </v-btn>
      <v-btn
        rounded
        width="250"
        height="50"
        color="primary"
        elevation="8"
        style="margin: 5px"
        :href="'manuel_identidys.pdf'"
        target="_blank"
        >Manuel d'utilisation
      </v-btn>
    </v-row>
  </v-row>
</template>
<style lang="scss">
.vue-html2pdf .layout-container {
  background: white !important;
}
</style>
<script lang="ts">
import Vue from "vue";
import VueHtml2pdf from "vue-html2pdf";
import Component from "vue-class-component";
import { Quiz } from "@/model/ResponseModel";

@Component({
  name: "Result",
  components: { VueHtml2pdf }
  // Toutes les options de composant sont autorisées ici.
})
export default class Result extends Vue {
  data: Quiz = this.$store.state.quizzes;
  image = require("@/assets/logo.png");
  series: any[] = [];
  chartOptions: any[] = [];
  dataResult = [
    {
      name: "verte",
      color: "#00E676",
      zone: "Non significatif",
      sub: [] as string[]
    },
    {
      name: "orange",
      color: "#FEAF19",
      zone: "À surveiller",
      sub: [] as string[]
    },
    {
      name: "rouge",
      color: "#F4511D",
      zone: "À risque",
      sub: [] as string[]
    }
  ];
  mounted() {
    for (const subject of this.data.subjects) {
      const options = {
        tooltip: {
          enabled: false,
          y: {
            formatter: function(val: any, opt: any) {
              let sum = 0;
              for (let i = 0; i < opt.seriesIndex + 1; i++) {
                sum += subject.ranking[i];
              }

              let sum2 = 0;
              for (let i = 0; i < opt.seriesIndex; i++) {
                sum2 += subject.ranking[i];
              }
              return sum2 + " - " + sum;
            }
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          type: "bar",
          height: 200,
          stacked: true,
          stackType: "normal"
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          formatter: function(val: any, opt: any) {
            let sum = 0;
            for (let i = 0; i < opt.seriesIndex + 1; i++) {
              sum += subject.ranking[i];
            }

            let sum2 = 0;
            for (let i = 0; i < opt.seriesIndex; i++) {
              sum2 += subject.ranking[i];
            }
            return sum2 + " - " + sum;
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        title: {
          text: subject.name
        },
        xaxis: {
          categories: [""],
          max: 24,
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40
        }
      };
      this.chartOptions.push(options);
      this.series.push([
        {
          name: "Non significatif",
          data: [subject.ranking[0]],
          color: "#00E676"
        },
        {
          name: "À surveiller",
          data: [subject.ranking[1]],
          color: "#FEAF19"
        },
        {
          name: "À risque",
          data: [subject.ranking[2]],
          color: "#F4511D"
        }
      ]);
      const color = this.computeColor(subject.ranking, subject.score);
      if (subject.disable) {
        this.dataResult[0].sub.push(subject.name);
      } else {
        color.sub.push(subject.name);
      }
    }
  }

  generateReport() {
    (this.$refs.html2Pdf as any).generatePdf();
  }

  computeColor(ranking: number[], score: number) {
    let sum = 0;
    for (let i = 0; i < ranking.length; i++) {
      const rank = ranking[i];
      sum += rank;
      if (score < sum) {
        return this.dataResult[i];
      }
    }
    return this.dataResult[ranking.length - 1];
  }
}
</script>
