<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择: </dt>
      <dd
        v-for="item in alphabet"
        :key="item"
      >
        <nuxt-link :to="`#city-${item}`">
          {{ item }}
        </nuxt-link>
      </dd>
    </dl>
    <dl
      v-for="item in block"
      :key="item.title"
      class="m-categroy-section"
    >
      <dt :id="'city-'+item.title">
        {{ item.title }}
      </dt>
      <dd>
        <span
          v-for="city in item.cities"
          :key="city"
          @click="changeCity(city)"
        >
          <nuxt-link to="/">{{ city }}</nuxt-link>
        </span>
      </dd>
    </dl>
  </div>
</template>
<script>
import pyjs from 'js-pinyin'
import ChangeCity from "./mixinFunction/changeCity";

export default {
  mixins: [ChangeCity],
  data () {
    return {
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block:[]
    };
  },
  async mounted(){
    let self=this;
    let blocks=[]
    let {status,data:{city}}=await self.$axios.get('/geo/city');
    if(status ===200){
      let inital
      let charCode
      let InitalCollection = {}
      city.forEach(city => {
          inital = pyjs.getFullChars(city.name).toLocaleLowerCase().slice(0,1)
          charCode = inital.charCodeAt(0)
          if(charCode>96&&charCode<123){
            if(!InitalCollection[inital]){
              // 如果首字母集合里某个字母的array为null 就新建一个array
              InitalCollection[inital]=[]
            }
              InitalCollection[inital].push(city.name)
          }
      });
      for(let [k,v] of Object.entries(InitalCollection)){
        blocks.push({
          title:k.toLocaleUpperCase(),
          cities: v
        })
      }
      blocks.sort((a,b)=> a.title.charCodeAt(0)-b.title.charCodeAt(0))
      self.block = blocks
    }
  }
}
</script>

<style lang="scss" scoped src='@/assets/css/changeCity/categroy.scss'>
// @import '.../assets/css/changeCity/categroy.scss';
</style>
