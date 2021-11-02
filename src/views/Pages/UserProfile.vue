<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;"
    >
      <div v-if="activites != null">
        <b-container fluid>
          <!-- Mask -->
          <span class="mask bg-gradient-success opacity-8"></span>
          <!-- Header container -->
          <b-container fluid class="d-flex align-items-center">
            <b-row>
              <b-col lg="7" md="10">
                <h1 class="display-2 text-white">Hello {{user.username}}</h1>
                <p class="text-white mt-0 mb-5">
                  This is your profile page. You can see the progress you've
                  made with your work and manage your projects or assigned tasks
                </p>
                <a href="#!" class="btn btn-info">Edit profile</a>
              </b-col>
            </b-row>
          </b-container>
        </b-container>

        <b-container fluid class="mt--6">
          <b-row>
            <b-col xl="4" class="order-xl-2 mb-5">
              <user-card></user-card>
            </b-col>
            <b-col xl="8" class="order-xl-1">
              <edit-profile-form></edit-profile-form>
            </b-col>
          </b-row>
        </b-container>
      </div>
      
    </div>
    <b-container fluid>
      <div v-if="activites == null" fluid class="d-flex align-items-center">
        <b-container fluid class="d-flex align-items-center">
            <b-row>
              <b-col lg="7" md="10">
                <h1 class="display-2 text-dark">Lamentamos pero no estas registrado</h1>
                
                
              </b-col>
            </b-row>
          </b-container>
      </div>
      </b-container>
   
    <button @click="logout">LOGOUT</button>
    <button ><router-link to="/login">Ir login</router-link></button>
  </div>
</template>
<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";
import UserCard from "./UserProfile/UserCard.vue";
import { mapActions} from 'vuex'
import { mapState } from "vuex";
export default {
  components: {
    EditProfileForm,
    UserCard
  },
  data() {
    return {
      activites:''
    };
  },
  mounted() {
    this.SET_USER()
  },
  methods: {
   ...mapActions('MUser',['SET_USER']),
    logout() {
      localStorage.removeItem("token");
      console.log("borrar token");
    }
  },
  computed:{
    ...mapState("MUser", ["user"]),
  },
  
};
</script>
<style></style>
