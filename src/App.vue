<template>
  <v-app>
    <v-system-bar color="deep-purple darken-3"></v-system-bar>
    <!-- navbar -->
    <v-app-bar app color="" 
      dense
      elevate-on-scroll
     >
      <!-- <v-toolbar-title>Tasky</v-toolbar-title> -->

      <!-- app bar -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
      <!-- apply some space -->
      <v-spacer></v-spacer>
      <!-- navitems -->
      <!-- <v-btn text rounded v-for="(link,index) in links" :key="index" :to="link.url">{{ link.label }}</v-btn> -->
      <v-btn rounded text to="/">Home</v-btn>
      <v-btn rounded text :to="{ name:'About' }">About</v-btn>
      <v-btn rounded text :to="{ name:'Tasks' }">Tasks</v-btn>
      <v-btn v-if="!loggedIn" rounded text :to="{ name:'Login' }">Login</v-btn>
      <v-btn v-if="!loggedIn" rounded text :to="{ name:'Register' }">Register</v-btn>
      <v-btn v-if="loggedIn" rounded text  @click="logout">Logout</v-btn>
      
    </v-app-bar>

    <!-- content -->
    <v-content>
      <!-- <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
      >
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                <v-list-item-title>Foo</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Bar</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Fizz</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>Buzz</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer> -->

      <router-view/>
    </v-content>

    <!-- footer -->
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name:'App',
  data(){
    return{
      drawer: false,
      group: null,
    }
  },
  watch: {
      group () {
        this.drawer = false
      },
  },
  computed:{
    ...mapGetters(['loggedIn'])
  },
  methods:{
    logout(){
      alert("Logged out")
    }
  }
}
</script>


<style>


</style>
