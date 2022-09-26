<script>
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import MailDetails from "./components/MailDetails.vue";

export default {
  data() {
    return {
      isDetailsOpen: false,
      detailsMailId: null,
    };
  },
  methods: {
    openDetails(id) {
      this.detailsMailId = id;
      this.isDetailsOpen = true;
    },
    closeDetails() {
      this.isDetailsOpen = false;
      this.detailsMailId = null;
    },
  },
  components: {
    RouterView,
    TheHeader,
    MailDetails,
  },
};
</script>

<template>
  <TheHeader />
  <MailDetails
    v-if="isDetailsOpen"
    :id="detailsMailId"
    @closeDetails="closeDetails"
    :key="detailsMailId"
  />
  <RouterView @openDetails="openDetails" />
</template>
