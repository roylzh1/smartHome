import axios from 'axios';

const service= axios.create({
    timeout: 50000
});
service.defaults.baseURL = "https://localhost:7140/api/";

service.interceptors.request.use(
    config => {
      if(config.method ==='get'){
        config.data = true;
      }else if(config.method ==='post'){
        config.data = JSON.stringify(config.data);
      }
      let token = localStorage.getItem("smartHome_userToken");
      if(token && config.headers){
        config.headers["Authorization"] = 'Bearer '+ token;
      }
      if(config.headers)
        config.headers["Content-Type"] = "application/json";
      return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response;
        } else {
            Promise.reject();
        }
    },
    async error => {
      if(error.response?.status === 401){
        ElMessage.error("令牌过期,请重新登录");
        
      }
        return Promise.reject(error.response);
    }
);

export default service;