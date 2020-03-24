<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card width="400"  class="mx-auto">
            <v-card-title class="mx-auto">Create an account</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="validate" ref="form" v-model="valid">
                <v-text-field :rules="usernameRules" v-model="username" label="Username" clearable></v-text-field>
                <v-text-field :rules="fnameRules" v-model="fname" label="First Name" clearable></v-text-field>
                <v-text-field :rules="lnameRules" v-model="lname" label="Last Name" clearable></v-text-field>
                <v-text-field :rules="emailRules" v-model="email" label="Email" clearable></v-text-field>
                <v-text-field type="password" :rules="passwordRules" v-model="password" label="Password" ></v-text-field>
                <v-btn block type="submit" color="success" dark>Register</v-btn>
              </v-form>
            </v-card-text>
            
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name:'Register',
  data(){
    return{
      valid:true,
      username:'',
      fname:'',
      lname:'',
      email:'',
      password:'',
      cpassword:'',
      usernameRules:[
        value => !!value || 'username is required',
      ],
      fnameRules:[
        value => !!value || 'first name is required',
      ],
      lnameRules:[
        value => !!value || 'last name is required',
      ],
      emailRules:[
        value => !!value || 'Email is required',
        value => value.indexOf('@') !== 0 || 'Email should have a username',
        value => value.includes('@') || 'Email should include an @ symbol',
        value => value.indexOf('.') - value.indexOf('@') > 1 || 'Email should contain a valid domain',
        value => value.indexOf('.') <= value.length -3 || 'Email should contain a valid domain extension'
      ],
      passwordRules:[
        value => !!value || 'password is required',
        value => value.length >= 8 || 'Min 8 characters',
        // value => (value || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||'Password must contain an upper case letter, a numeric character, and a special character',

      ],
      

    }
  },
  methods:{
    validate () {
      let valid = this.$refs.form.validate()
      if(valid){
        this.$store.dispatch("REGISTER_USER",{
          username: this.username,
          firstName: this.fname,
          lastName:this.lname,
          email:this.email,
          password: this.password
        }).then(()=>{
          this.$router.push({name:'Tasks'})
        })
      }
      // console.log(valid)
    },
  }

}
</script>

<style>

</style>