<script>
import { mapState, mapActions } from "pinia";
import { useMailsStore } from "../stores/mails";
import MailList from "../components/MailList.vue";

export default {
  data() {
    return {
      checkedAll: false,
    };
  },
  computed: {
    ...mapState(useMailsStore, ["archivedMails", "selectedArchivedMailsCount"]),
  },
  methods: {
    openDetails(id) {
      this.$emit("openDetails", id);
    },
    ...mapActions(useMailsStore, [
      "toggleRead",
      "toggleAll",
      "markAsReadSelectedArchiveMails",
      "unarchiveSelectedMails",
    ]),
  },
  created() {
    document.addEventListener("keyup", (e) => {
      if (e.key === "r") {
        this.markAsReadSelectedArchiveMails();
      } else if (e.key === "a") {
        this.unarchiveSelectedMails();
      }
      e.stopPropagation();
      e.preventDefault();
    });
  },
  components: { MailList },
};
</script>

<template>
  <div class="main">
    <h2>Archive</h2>
    <h1>Emails selected ({{ selectedArchivedMailsCount }})</h1>

    <div>
      <input
        v-model="checkedAll"
        @change="toggleAll('archived', checkedAll)"
        class="checkbox"
        type="checkbox"
      />
      <button
        @click="markAsReadSelectedArchiveMails"
        class="btn btn--gray btn--margin-right"
      >
        Mark as read (r)
      </button>
      <button
        @click="unarchiveSelectedMails"
        class="btn btn--gray btn--margin-right"
      >
        Unarchive (a)
      </button>
    </div>

    <div>
      <MailList :mails="archivedMails" @openDetails="openDetails" />
    </div>
  </div>
</template>
