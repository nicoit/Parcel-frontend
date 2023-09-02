
<script>
import Alert from "~/components/alert.vue";
export default {
  name: 'create',
  components: {Alert},
  data() {
    return {
      searching: false,
      title: '',
      description: '',
      status: '',
      trackingNumber: '',
      error: false,
      errortext: '',
      showalert: false

    }
  },
  methods: {
    async create() {
      console.log('creating');
      this.searching = true;
      let reval = {};
      try {
        reval = await $fetch('/api/create', {
          baseURL: 'http://localhost:8080',
          method: "POST",
          body: {
            title: this.title,
            description: this.description,
            status: this.status,
            trackingNumber: this.trackingNumber
          },
          ignoreResponseError: true
        });
      } catch (e) {
        console.log(e);
        this.error = true;
        this.errortext = e;
        this.showalert = true;
      }
      this.searching = false;
      console.log(reval);
      if (reval.message) {
        this.error = true;
        this.errortext = reval.errors;
        this.showalert = true;
      }
      else {
        this.error = false;
        this.errortext = 'Record Created!';
        this.showalert = true;
      }
      setTimeout(() => this.showalert = false, 6000);
    }
  }
}
</script>

<template>
<div class="card">
  <div class="card-body">
    <div class="mb-3">
      <label for="title" class="form-label"> Title/label</label>
      <input type="text" class="form-control" id="title" v-model="title"/>
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
    </div>
    <div class="mb-3">
      <label for="status" class="form-label"> Status</label>
      <select class="form-control" id="status" v-model="status">
        <option>posted</option>
        <option>in-transit</option>
        <option>delivered</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="trackingNumber" class="form-label">Tracking Number </label>
      <input type="text" class="form-control" id="trackingNumber"  v-model="trackingNumber"/>
    </div>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary" @click="create">Create <font-awesome-icon :icon="['fas', 'spinner']" spin style="font-size: 22px" v-if="searching"/></button>
    <alert :error="error" :text="errortext" @click="showalert = false" v-if="showalert"></alert>
  </div>
</div>
</template>

<style scoped>

</style>
