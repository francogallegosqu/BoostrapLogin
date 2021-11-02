

import { orderBy } from 'lodash';
import Api from './index' 
const token = JSON.parse(localStorage.getItem("token"));
    
export default{
    async register(form){
        return Api.post('/auth/local/register',form)
    },
    
    async login(form){
        return Api.post('/auth/local',form)
        
    },
    async get(){
        return Api.get('/products')
    },
    async get_orders(id){
        return Api.get('/orders',id)
    },
    async update_Order(id,form){
        return Api.put(`/orders/${id}`,form,{
            headers:{
                Authorization:'Bearer '+ token.jwt
            }
        })
    },
    async get_orders_by_id(id){
        return Api.get('/users/'+id,{
            headers:{
                Authorization:'Bearer '+ token.jwt
            }
        })
    },
    async get_details_order_by_id(id){
        return Api.get('/orders/'+id)
    },
    async orderBy(){
        return Api.get('orders')
    }
    
    
}