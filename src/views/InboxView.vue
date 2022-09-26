<script>
import { mapState, mapActions } from "pinia";
import { useMailsStore } from "../stores/mails";

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
      "toggleChecked",
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
      <ul class="list">
        <li
          v-for="mail in inboxMails"
          :key="mail.id"
          @click="openDetails(mail.id)"
          :class="[mail.isRead ? 'list__mail--read' : '', 'list__mail']"
        >
          <input
            @change="toggleChecked(mail.id)"
            class="checkbox"
            type="checkbox"
            :checked="mail.isChecked"
          />
          <p>{{ mail.title }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.list {
  margin-top: 50px;
  padding: 0;
}

.list__mail {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
}

.list__mail--read {
  opacity: 0.5;
}

.checkbox {
  margin-right: 20px;
}

.btn--gray {
  background-color: #f9f9f9;
  border: 1px solid #f5f5f50b;
}

.btn--margin-right {
  margin-right: 20px;
}
</style>
