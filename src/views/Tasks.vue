<template>
  <div>
      <v-container>
        <v-row>
          <v-col>
            <v-btn class="mx-2" fab dark color="indigo">
              <!-- dialog -->
              <v-dialog v-model="dialog" max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-icon dark v-on="on">mdi-plus</v-icon>
                </template>
                <v-card>
                  <v-card-title>Add task</v-card-title>
                  <v-card-text>
                    <v-form>
                      <v-text-field v-model="title" label="title"></v-text-field>
                      <v-textarea
                        v-model="description"
                        filled
                        label="description"
                        rows="2"
                        row-height="20"
                      ></v-textarea>
                      <v-btn color="success">Submit</v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-btn>
          </v-col>
        </v-row>
        <v-row :align="alignment" :justify="justify" >
          <v-col v-for="(task,index) in $store.state.tasks" :key="index">
            <v-card max-width="344" class="mx-auto">
              <v-card-text>
                <p class="display-1 text--primary">
                  {{ task.task }}
                </p>
                <div class="text--primary mb-3">
                  {{ task.description }}
                </div>
                <p class="text--primary date" >created on:{{ task.created_at.substring(0, 10) }}</p>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-icon>mdi-delete</v-icon>
                <v-spacer></v-spacer>
                <v-icon>mdi-edit</v-icon>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        
      </v-container>
  </div>
</template>

<script>

export default {
  name:'Tasks',
  data(){
    return{
      dialog:false,
      title:'',
      description:'',
      alignment: 'center',
      justify:'center'
    }
  },
  mounted(){
    this.$store.dispatch('GET_TASKS')
  },
  
  
}
</script>

<style scoped>
.date{
  margin: 0;
  font-family: monospace;
}
</style>