<script>
// Vendors
import axios from 'axios';

// Environments
import { environment } from './../../../environment/environment';

export default {
    name: 'articlesService',

    testSave(formData) {
        // const config = { headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` } };
        return axios.post(`${environment.mySql.databaseURL}/articles/create`, formData);
    },

    getArticles(page) {
        console.log(page)
        return axios.get(`${environment.mySql.databaseURL}/articles/getImage/0bb36019cc53a3b6cc8ceedb78e84894.jpg`)
    },
}
</script>