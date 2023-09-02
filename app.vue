<template>

  <div class="container text-center">
    <div class="row align-items-start">
      <div class="col">
        <button class="btn btn-info" @click="action='create'">
        Create
        </button>
      </div>
      <div class="col">
        <button class="btn btn-info" @click="action='search'">
        Search
        </button>
      </div>
    </div>
    <div class="row align-items-start">
      <div class="col-4">
      </div>
      <div class="col-4">
        <create style="max-width: 50vw" v-if="action === 'create'"></create>
        <search style="max-width: 50vw" v-if="action === 'search'"></search>
      </div>
      <div class="col-4">
      </div>
    </div>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import Create from "~/components/create.vue";
import Search from "~/components/search.vue";
export default defineComponent({
  components: {Create, Search},
  data() {
    return {
      action: ''
    }
  }
})
</script>
