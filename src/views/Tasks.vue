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
          <v-col>
            <v-card max-width="344" class="mx-auto">
              <v-card-text>
                <p class="display-1 text--primary">
                  be•nev•o•lent
                </p>
                <div class="text--primary mb-3">
                  well meaning and kindly.<br>
                  "a benevolent smile"
                </div>
                <p class="text--primary date" >21/03/2020</p>
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
  }

}
</script>

<style scoped>
.date{
  margin: 0;
  font-family: monospace;
}
</style>