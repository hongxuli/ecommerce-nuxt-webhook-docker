export default function({ $axios, store, redirect }) {
  // client side axios
  $axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });
  $axios.onError(error => {});
  $axios.interceptors.response.use(response => {
    if (response.data.errDesc != null) {
      message.success(response.data.errMsg);
    }
    return response.data;
  });
}
