<script>
// Vendors
import axios from 'axios';

// Environments
import { environment } from './../../../environment/environment';

export default {
    name: 'authSerivce',
    regist(userData) {
        return axios.post(`${environment.mySql.databaseURL}/auth/registration`, userData)
    },

    login(userData) {
        return axios.post(`${environment.mySql.databaseURL}/auth/login`, userData)
    }
}
</script>