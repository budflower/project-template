<template>
  <div class="main">
    <el-select v-model="inputVal" placeholder="请选择" filterable remote :remote-method="fetch" @change="$emit('change')" clearable  :multiple="multiple">
      <el-option
        v-for="item in list"
        :key="item.id"
        :label="item.name"
        :value="item.id"

        >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { fetchList } from '@/service/api'

export default {
  props: {
    multiple: { // 是否是多选
      default: false
    },
    urlKey: String,
    otherQuery: null,// 调列表接口的其他查询参数。可以函数用 {name: null, someKey: name} 来自定义远程搜索的key
    autoFetch: Boolean,
    value: null//String // v-model
  },
  data() {
    return {
      list: [],
      inputVal: null
    }  
  },
  watch: {
    inputVal() {
      if(Array.isArray(this.inputVal)) {
        this.$emit('input', this.inputVal)
      } else {
        this.$emit('input', this.inputVal + '')
      }
    }
  },
  methods: {
    fetch(name) {
      // debugger
    //   this.list = [{
    //     uuid: '1',
    //     name: 'test'
    //   }]
      var otherQuery
      if(typeof this.otherQuery === 'function') {
        otherQuery = this.otherQuery(name)
      } else {
        otherQuery = this.otherQuery
      }
      fetchList(this.urlKey, {name: name, ...otherQuery}, {
        current: 1,
        limit: 20
      }, null).then(res => {
        this.list = res.data.data.map(item => {
          return {
            id: item.id || item.key,
            name: item.name || item.label
          }
        })
      })
    },
    setVal(value) {
      this.inputVal = value
    }
  },
  mounted() {
    this.inputVal = this.value
    if(this.multiple) {
      this.inputVal = this.inputVal || []
    }
    if(this.autoFetch) {
      this.fetch()
    }
  }
}
</script>

<style></style>