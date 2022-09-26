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
    ...mapState(useMailsStore, ["inboxMails", "selectedInboxMailsCount"]),
  },
  methods: {
    openDetails(id) {
      this.$emit("openDetails", id);
    },
    ...mapActions(useMailsStore, [
      "toggleRead",
      "toggleAll",
      "markAsReadSelectedInboxMails",
      "archiveSelectedMails",
    ]),
  },
  created() {
    document.addEventListener("keyup", (e) => {
      if (e.key === "r") {
        this.markAsReadSelectedInboxMails();
      } else if (e.key === "a") {
        this.archiveSelectedMails();
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
    <h2>Inbox</h2>
    <h1>Emails selected ({{ selectedInboxMailsCount }})</h1>

    <div>
      <input
        v-model="checkedAll"
        @change="toggleAll('inbox', checkedAll)"
        class="checkbox"
        type="checkbox"
      />
      <button
        @click="markAsReadSelectedInboxMails"
        class="btn btn--gray btn--margin-right"
      >
        Mark as read (r)
      </button>
      <button
        @click="archiveSelectedMails"
        class="btn btn--gray btn--margin-right"
      >
        Archive (a)
      </button>
    </div>

    <div>
      <MailList :mails="inboxMails" @openDetails="openDetails" />
    </div>
  </div>
</template>
