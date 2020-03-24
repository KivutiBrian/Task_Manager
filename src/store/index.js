import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex,axios)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") ||null,
    tasks:[]

  },
  mutations: {
    SET_TOKEN(state,token){
      state.token = token
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
    },

    CLEAR_TOKEN(state){
      state.token = null
      axios.defaults.headers.common['Authorization'] = null
      state.tasks = null
    },

    SET_TASKS(state,payload){
      state.tasks = payload
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

    // logout
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
    },

    // get tasks
    GET_TASKS(context){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`

      axios.get('http://localhost:5000/tasks')
        .then(response=>{
          console.log(response.data)
          context.commit('SET_TASKS',response.data.tasks)
        })
        .catch(error=>console.log(error))
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
