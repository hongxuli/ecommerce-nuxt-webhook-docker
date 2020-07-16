<template>
  <div class="m-iselect">
    <span class="name">按省份搜索</span>
    <el-select
      v-model="pvalue"
      placeholder="省份"
    >
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item"
      />
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市"
      @change="handleSelect"
    >
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item"
      />
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect('input')"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions } from "vuex";
export default {
  data: ()=>{
    return {
      province:[],
      pvalue:'',
      city:[],
      cvalue:'',
      input:'',
      citiesImagination:[],
    }
  },
  watch:{
    pvalue: async function(newPvalue){
      let self = this
      let {status, data:{city}} = await self.$axios.get(`/geo/province/${newPvalue.value}`)
      if (status === 200){
        self.city = city.map((item)=>{
          return{
            value: item.id,
            label: item.name ==='市辖区'? item.province: item.name
          }
        })
        self.cvalue =''
      }
    },

  },
  mounted: async function getProvinces () {
      let self= this
      let {status, data:{province}} = await this.$axios.get('/geo/province')
      if(status === 200){

      this.province = province.map(item=>{
        return {
          value:item.id,
          label:item.name
        }
      })
    } },

  methods:{
    querySearchAsync: async function(queryString,cb){
      if(!this.citiesImagination.length){
        let {status,data:{city}} = await this.$axios.get('/geo/city')
        if(status===200){
          this.citiesImagination = city.map(item=> {return {value:item.name}})
        }
      }
      cb(this.citiesImagination.filter(item=>item.value.indexOf(queryString)>-1))
    },
    handleSelect:function(type){

      //redirect to home page with choosen city
      let position = {}
      if(type ==='input'){
      // need map city to its province later
      position = {province: '', city: this.input}
      }else{
      position = { province: this.pvalue.label, city: this.cvalue.label}

      }
      this.$store.dispatch('geo/setPosition',position)
      this.$router.push('/')
    },
  }

}
</script>

<style lang = 'scss' src='@/assets/css/changeCity/iselect.scss'>
/* @import '~@/assets/css/changeCity/iselect.scss'; */
</style>
