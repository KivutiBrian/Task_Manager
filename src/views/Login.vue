<template>
    <v-card width="400" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">Login</h1>
        </v-card-title>

        <v-card-text>
          <v-form >
            <v-text-field v-model="email" :rules="emailRules" label="email" prepend-icon="mdi-account-circle"></v-text-field>
            <v-text-field
            v-model="password" 
            label="password" 
            :type="showPassword ? 'text': 'password' " 
            prepend-icon="mdi-lock" 
            :append-icon="showPassword ?  'mdi-eye': 'mdi-eye-off' "
            @click:append="showPassword=!showPassword"
            :rules="passwordRules"></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn @click="login" color="success">Submit</v-btn>
          <v-spacer></v-spacer>
          <v-btn :to="{ name:'Register' }" color="info">Register</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name:'Login',
    data(){
        return{
            showPassword:false,
            email:'',
            password:'',
            emailRules:[
                value => !!value || 'Email is required',
                value => value.indexOf('@') !== 0 || 'Email should have a username',
                value => value.includes('@') || 'Email should include an @ symbol',
                value => value.indexOf('.') - value.indexOf('@') > 1 || 'Email should contain a valid domain',
                value => value.indexOf('.') <= value.length -3 || 'Email should contain a valid domain extension'
            ],
            passwordRules:[
              value => !!value || 'Password is required'
            ]
        }
    },
    methods:{
      login(e){
        e.preventDefault()
        this.$store.dispatch('RETRIEVE_TOKEN',{
          email:this.email,
          password:this.password
        }).then(()=>{
          this.$router.push({name:'Tasks'})
        })
      }
    }
}
</script>

<style>
</style>
© 2020 GitHub, Inc.