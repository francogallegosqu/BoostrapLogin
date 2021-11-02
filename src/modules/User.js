
import User from '@/api/User'
import { reject } from 'lodash';
export default {
    namespaced:true,
    state:{
        user:{},
       
    },
    mutations:{
        SET_USER(state){
            const token = JSON.parse(localStorage.getItem("token"));
            state.user = token.user;
        },
        
    },
    actions:{
        SET_USER({commit}){
            commit('SET_USER')
        },
        LOGINUSER({commit},payload){ 
            
            return new Promise((resolve,reject)=>{
                User.login(payload)
                .then(response => {
                    localStorage.setItem('token',JSON.stringify(response.data))
                    resolve(response.data)
                  })
                  .catch(error=> reject(error))
            }) 
              
              

        }

    }

}