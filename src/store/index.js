import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex,axios)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") ||null

  },
  mutations: {
    SET_TOKEN(state,token){
      state.token = token
    },

    CLEAR_TOKEN(state){
      state.token = null
    }

  },
  actions: {

    // register a user
    REGISTER_USER(context,payload){
      return new Promise((resolve,reject)=>{
        axios.post('http://localhost:5000/users',{
          username:payload.username,
          firstName:payload.firstName,
          lastName:payload.lastName,
          email:payload.email,
          password:payload.password
        }).then(response=>{
          console.log(response)
          const token = response.data.access_token
          localStorage.setItem("token",token)
          context.commit("SET_TOKEN",token)
          resolve()
        }).catch(error=>{
          console.log(error)
          reject()
        })
      })
    },

    // login a user
    RETRIEVE_TOKEN(context,payload){
      return new Promise((resolve,reject)=>{
          axios.post('http://localhost:5000/login',{
          email:payload.email,
          password:payload.password
        }).then(response =>{
          const token = response.data.access_token
          localStorage.setItem("token",token)
          context.commit("SET_TOKEN",token)
          resolve(response)

        }).catch(error=>{
          console.log(error)
          reject(error)
        })
      })  
    },

    DESTROY_TOKEN(context){
      return new Promise((res,rej)=>{
        // destroy token only if we are logged in
        if(context.getters.loggedIn){
          localStorage.removeItem('token')
          context.commit("CLEAR_TOKEN")
          res()
        }else{
          rej()
        }
      })
      

    }

  },
  getters:{
    loggedIn(state){
      return state.token !== null
    }
  },
  modules: {

  }
})
