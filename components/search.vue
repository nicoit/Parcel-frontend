

<script>
import Alert from "~/components/alert.vue";
// const runtimeConfig = useRuntimeConfig();
export default {
  setup() {
    const runtimeConfig = useRuntimeConfig()
  },
  name: 'search',
  components: {Alert},
  data() {
    return {
      updating: false,
      searching: false,
      parcel: {},
      title: '',
      description: '',
      status: '',
      trackingNumber: '',
      error: false,
      errortext: '',
      showalert: false,
      showalert1: false
    }
  },
  methods: {
    async search() {
      console.log('searching');
      this.showalert = false;
      this.showalert1 = false;
      this.searching = true;
      let parcel = {};
      try {
        parcel = await $fetch('/api/getbytracking', {
          baseURL: 'http://localhost:8080',
          method: "PATCH",
          body: {
            trackingNumber: this.trackingNumber
          },
          ignoreResponseError: true
        })
      } catch (e) {
        console.log(e);
        this.error = true;
        this.errortext = e;
        this.showalert = true;
      }
      this.searching = false;
      this.parcel = parcel;
      if (parcel.message) {
        this.error = true;
        this.errortext = parcel.message;
        this.showalert = true;
      }
      else {
        this.error = false;
        this.errortext = 'Record Found!';
        this.showalert = true;
      }
      setTimeout(() => this.showalert = false, 6000);
    },
    async update() {
      console.log('updateing');
      this.showalert = false;
      this.showalert1 = false;
      this.updateing = true;
      let reval = {};
      try {
        reval = await $fetch('/api/update', {
          baseURL: 'http://localhost:8080',
          method: "PATCH",
          body: {
            trackingNumber: this.trackingNumber,
            status: this.parcel.status
          },
          ignoreResponseError: true
        })
        } catch (e) {
          console.log(e)
        console.log(e);
        this.error = true;
        this.errortext = e;
        this.showalert1 = true;
      }
      this.updateing = false;
      if (reval.message) {
        this.error = true;
        this.errortext = reval.message;
        this.showalert1 = true;
      }
      else {
        this.error = false;
        this.errortext = 'Updated Successfully!';
        this.showalert1 = true;
      }
      setTimeout(() => this.showalert1 = false, 6000);
      }
    }
}
</script>

<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Search Parcel</h5>
        <div class="mb-3">
          <label for="trackingNumber" class="form-label">Tracking Number </label>
          <input type="text" class="form-control" id="trackingNumber" v-model="trackingNumber"/>
        </div>
      </div>
        <div class="card-footer">
          <button class="btn  btn-primary" @click="search">Search <font-awesome-icon :icon="['fas', 'spinner']" spin  style="font-size: 22px" v-if="searching"/></button>
          <alert :error="error" :text="errortext" @click="showalert = false" v-if="showalert"></alert>
        </div>
    </div>
    <div class="card" v-if="parcel.title">
      <div class="card-body">
        <h5 class="card-title">Update status</h5>
        <div class="mb-3">
          <label for="title" class="form-label"> Title/label</label>
          <input type="text" class="form-control" id="title" placeholder="Set Title" v-model="parcel.title" disabled/>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" rows="3" v-model="parcel.description" disabled></textarea>
        </div>
        <div class="mb-3">
          <label for="status" class="form-label"> Status</label>
          <select class="form-control" id="status" v-model="parcel.status">
            <option>posted</option>
            <option>in-transit</option>
            <option>delivered</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="trackingNumber" class="form-label">Tracking Number </label>
          <input type="text" class="form-control" id="trackingNumber" placeholder="Set Title" v-model="parcel.trackingNumber" disabled/>
        </div>
      </div>
      <div class="card-footer">
          <button class="btn  btn-primary" @click="update">Update <font-awesome-icon :icon="['fas', 'spinner']" spin  style="font-size: 22px" v-if="updating"/></button>
          <alert :error="error" :text="errortext" @click="showalert1 = false" v-if="showalert1"></alert>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
