<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        v-for="item in list"
        :key="item.id"
        @click="changeCity(item)"
      >
        <nuxt-link to="/">
          {{ item.name==='市辖区'?item.province:item.name }}
        </nuxt-link>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list:[]
    }
  },
  async mounted(){
    let {status,data:{hots}}=await this.$axios.get('/geo/hotCity')
    if(status===200){
      this.list=hots
    }
  },
  methods:{
    changeCity:function (item) {

      const position = { province: item.province, city: item.name==='市辖区'?item.province:item.name}
      this.$store.dispatch('geo/setPosition',position)
      // this.$router.push('/')
      }
  }
}
</script>

<style lang="scss" src='@/assets/css/changeCity/hot.scss'>
// @import '~@/assets/css/changeCity/hot.scss';
</style>
