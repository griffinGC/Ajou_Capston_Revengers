<template>
    <v-content>
      <section>
          <v-parallax dark height="600" :src="require('@/assets/field.jpg')">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <!-- <img src="../assets/vuetify.png" alt="Vuetify.js" height="250"> -->
            <h1 class="white--text mb-2 display-1 text-xs-center">FarmRoad에 <br>오신것을 환영합니다.</h1>
            <div class="subheading mb-3 text-xs-center"></div>
          </v-layout>
        </v-parallax>
      </section>
<section>
        <v-container grid-list-xl>
           <div class="text-xs-center">
              <h2 class="headline">Farmroad의 목표</h2><br>
              <span class="subheading">
               플랫폼을 통하여 보다 나은 무전여행과 부족한 농촌의 노동력 제공
              </span>
            </div>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">directions_run</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">무전여행</div>
                    </v-card-title>
                    <v-card-text class="text-xs-center">
                      농촌에 노동력을 제공하여 숙식문제 해결<br>
                      이제는 더 이상 민폐적이지 않은 무전여행 
                    </v-card-text>
                  </v-card>
                </v-flex>
           <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">nature_people</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">농촌의 노동력 제공</div>
                    </v-card-title>
                    <v-card-text class="text-xs-center">
                      숙식을 제공하여 부족한 노동력 문제 해결<br>
                      시급인상으로 인한 노동력 임금문제 해결  
                    </v-card-text>
                  </v-card>
                </v-flex>
          </v-layout>
        </v-container>
      </section>
                 
      <section>
        <v-parallax :src="require('@/assets/countryside.jpg')" height="500">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">무전여행 그리고 노동력 문제</div>
            <em>더 이상 고민거리가 아닙니다!</em>
            <!-- <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
            >
              Get Started
            </v-btn> -->
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">개발자 연락처</div>
                </v-card-title>
                <v-card-text>
                  서비스 이용 중 어플리케이션에 문제가 발생한 경우 저희에게 연락하세요. 
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>031-123-1234</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>경기도, 수원</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>ajou@ajou.co.kr</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <v-footer class="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3">
              <!-- Made with
              <v-icon class="red--text">favorite</v-icon>
              by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
              and <a class="white--text" href="https://github.com/vwxyzjn">Costa Huang</a> -->
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
</template>

<script>
export default {

}
</script>

<style>
h2{
  margin-top:75px;
}
</style>
