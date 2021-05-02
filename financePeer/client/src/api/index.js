import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
})

export const createUser = payload => api.post(`/user`, payload)
export const getData = () => api.get(`/getData`)


export const validateUser = (email,password,cb) => {
  api.post(`/users/signin`, { email, password }).then(function(res) {
      cb(res);
    })
    .catch(function(err) {
      cb(err,true);
    });
};



const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}
export const uploadFile = payload => api.post(`/upload_file`, payload, config)





// since we're not generating JWT on client side!
// export const GenerateJWT = (header, claims, key, cb) => {
//   // Send request to /api/GenerateJWT
//   api.post("/GenerateJWT", { header, claims, key }).then(function(res) {
//       cb(res);
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// };


export const DecodeJWT = (sJWS, cb) => {
  // Send request to /api/DecodeJWT
  api.post("/DecodeJWT", { sJWS }).then(function(res) {
      cb(res);
    })
    .catch(function(err) {
      console.log(err);
    });
};
export const ValidateJWT = (header, token, key, cb) => {
  // Send request to /api/ValidateJWT
  api.post("/ValidateJWT", { header, token, key }).then(function(res) {
      cb(res);
    })
    .catch(function(err) {
      console.log(err);
    });
};

const apis = {
    createUser,
    getData,
    validateUser,
    uploadFile,
    DecodeJWT,
    ValidateJWT
}

export default apis
