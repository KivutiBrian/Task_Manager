import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex,axios)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") ||null,
    tasks:[],
    loading:false
  },
  mutations: {
    SET_TOKEN(state,token){
      state.token = token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },

    CLEAR_TOKEN(state){
      state.token = null
      axios.defaults.headers.common['Authorization'] = null
      state.tasks = null
    },

    SET_LOADING_STATUS(state,payload){
      state.loading = payload
    },

    SET_TASKS(state,payload){
      state.tasks = payload
    },

    UPDATE_TASKS_LIST(state,payload){
      state.tasks.push(payload)
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
        context.commit('SET_LOADING_STATUS',true)

        axios.post('http://localhost:5000/login',{
        email:payload.email,
        password:payload.password
        }).then(response =>{
          context.commit('SET_LOADING_STATUS',false)
          const token = response.data.access_token
          localStorage.setItem("token",token)
          context.commit("SET_TOKEN",token)
          resolve(response)
        }).catch(error=>{
          context.commit('SET_LOADING_STATUS',false)
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
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`;
      return new Promise((resolve,reject)=>{
        
        axios.get('http://localhost:5000/tasks')
        .then(response=>{
          context.commit('SET_TASKS',response.data.tasks)
          resolve(resolve)
        })
        .catch(error=>{
          console.log(error)
          reject(error)
        })
      })
      
    },

    ADD_TASK(context,payload){
      axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`

      return new Promise((resolve,reject)=>{
        axios.post('http://localhost:5000/tasks',payload)
        .then(response=>{
          console.log(response.data)
          context.commit("UPDATE_TASKS_LIST",response.data)
          resolve()
        })
        .catch(error=>{
          console.log(error)
          reject()
        })
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
