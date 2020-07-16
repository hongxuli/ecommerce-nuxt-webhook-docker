export default function({ store, redirect, app: { $axios } }) {
  $axios.defaults.baseURL = process.env.baseUrl;
  $axios.onRequest(config => {});
  $axios.onError(error => {});
  $axios.interceptors.response.use(response => {
    if (response.data.errDesc != null) {
      message.success(response.data.errMsg);
    }
    return response.data;
  });
}
