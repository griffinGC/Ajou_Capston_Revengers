<template>
  <div class="home">
    <h1 class="subheading grey--text">Message</h1>
    <v-container row class="mb-3">
      
      <!--卡片内容-->
      <v-card class="pa-3" v-for="project in projects" :key="project.id">
        <v-layout row wrap :class="`pa-3 project.${project.title}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">title</div>
            <div>{{project.title}}</div>
          </v-flex>

          
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">preson</div>
            <div>{{project.guestInfo}}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Dua by</div>
            <div>{{project.due}}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div>
              <v-chip small :class="`dark--text caption`">{{project.status}}</v-chip>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  

  export default {
    name: 'home',
    data(){
      return{
        projects: [
        {
          title: "Design a new webside",
          person: "Ninja",
          due: "20190307",
          status: "ongoing",
          content:
            "尝试Vue.js 最简单的方法是使用JSFiddle 上的Hello World 例子。你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。或者你也可以创建一个 .html 文件，"
        },
        {
          title: "Code up the sign page",
          person: "chun li",
          due: "20190408",
          status: "complete",
          content:
            "尝试Vue.js 最简单的方法是使用JSFiddle 上的Hello World 例子。你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。或者你也可以创建一个 .html 文件，"
        },
        {
          title: "Design a new webside",
          person: "Ninja",
          due: "20190307",
          status: "ongoing",
          content:
            "尝试Vue.js 最简单的方法是使用JSFiddle 上的Hello World 例子。你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。或者你也可以创建一个 .html 文件，"
        },
        {
          title: "create a community for formu",
          person: "khalil",
          due: "20190307",
          status: "overdue",
          content:
            "尝试Vue.js 最简单的方法是使用JSFiddle 上的Hello World 例子。你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。或者你也可以创建一个 .html 文件，"
        }
      ],
      boardList:[]
      }
    },
    components: {
      
    },
    created :function(){

    },
    methods: {

    }
  }
</script>
