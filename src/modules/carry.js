import Products from '@/api/Products'
import User from '@/api/User'
import { dispatch } from 'd3'
import { reject } from 'lodash'
export default {
    namespaced:true,
    state:{
        carry:[],
        orders:[],
        orderonhold:null,
        detailsorder:[],
        obj:{},
        user:null
    },
    mutations:{
        SET_CARRY(state,payload){
            state.carry.push(payload)
        },
        DELETE_BY_ID(state,id){
            state.carry.splice(id,1)
        },
        UPDATE_CARRY(state,payload){
            var busqueda = _.find(state.carry, ['id',payload.id])
            //si está
            if(typeof busqueda == 'object'){
              //si está en el carrito dame el indice en la posición del array
                var index = _.indexOf(state.carry, busqueda)
                state.carry[index].Quantity++
            }
        },
        UPDATE_CARRY_DEC(state,payload){
            var busqueda = _.find(state.carry, ['id',payload.id])
            //si está
            if(typeof busqueda == 'object'){
              //si está en el carrito dame el indice en la posición del array
                var index = _.indexOf(state.carry, busqueda)
                if(state.carry[index].Quantity==1){
                    state.carry.splice(index, 1);
                } else {
                    state.carry[index].Quantity--
                }
           }
        },
        GET_ORDERS(state,payload){
            state.orders= payload          
        },
        SET_FILTER(state,payload){
            state.orderonhold = payload
        },
        SET_DETAILS_ORDER(state,payload){
            state.detailsorder = payload
        },
        SET_OBJ(state,payload){
            state.obj = payload
        },
        DELETE_DETAILS_ORDER(state){
            state.detailsorder = []
        },
        USERID(state,id){
            state.user=id
        }
        
        
    },
    actions:{
        ADD_CARRY({commit},payload){
            commit("SET_CARRY",payload)
        },
        DELETE_CARRY_BY_ID({commit},id){
            commit('DELETE_BY_ID',id)
        },
        UPDATE_CARRY_QTY({commit},payload){
            commit('UPDATE_CARRY',payload)
        },
        UPDATE_CARRY_DEC({commit},payload){
            commit('UPDATE_CARRY_DEC',payload)
        },
       
        UPDATE_ORDER({commit,state},id){
            
            User.update_Order(id,state.obj)
            .then(response =>{
                
                console.log(response)
            })
            .catch(error=> console.error(error))
        },
        GET_ORDERS({commit},id){
            return new Promise((resolve,reject)=> {User.get_orders_by_id(id)
                .then(response =>{ 
                    commit('GET_ORDERS',response.data.orders)
                    
                    resolve(response.data.orders)
                    
                    
                })
                .catch(error => console.error(error))})
        },
        GET_FILTER({dispatch,commit},id){
            dispatch('GET_ORDERS',id).then(response=>{
                let pend=response.filter(obj=>obj.TotalAmount==0)
                
                if(pend[0]==null){ return}
                else{
                    commit('SET_FILTER',pend[0])
                    dispatch('GET_DETAILS_ORDER',pend[0].id)
                }
                
              })
              
        },
        GET_DETAILS_ORDER({commit},id){
            User.get_details_order_by_id(id).then(response=>{
                commit('SET_DETAILS_ORDER',response.data.detalle_ordens)
                
            })
        },
       SET_OBJ({commit},obj){
           commit('SET_OBJ',obj)
       },
       DELETE_DETAILS_ORDER({commit}){
           commit('DELETE_DETAILS_ORDER')
       },
       ADD_CARRY({state,commit},product){
        
        if(state.orderonhold === null){
            console.log("carrito vacio")
            let obj = {
              TotalAmount:0,
              user: state.user
            };
           
            Products.createOrder(obj).then(response => {
            console.log(response);
              let robj = {
                order: response.data.id,
                product: product.id,
                Quantity: 1
              };
              Products.createDetailsOrder(robj).then(response => {
                console.log(response.data);
              });
            
          });
    
          
          }
          else {
            console.log("carrito lleno")
            
             let robj = {
                order: state.orderonhold.id,
                product: product.id,
                Quantity: 1
              };
              console.log(robj)
              Products.createDetailsOrder(robj).then(response => {
                console.log(response.data);
              });
              console.log("peticion exitosa!")
          }
       },
       USERID({commit},id){
           commit('USERID',id)
       }
       
        
        

        
    }
}