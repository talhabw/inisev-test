<script>
import { RouterLink } from "vue-router";
import { mapState } from "pinia";
import { useMailsStore } from "../stores/mails";

export default {
  computed: {
    ...mapState(useMailsStore, ["countOfInboxMails", "countOfArchivedMails"]),
  },
  components: {
    RouterLink,
  },
};
</script>

<template>
  <header class="header">
    <nav>
      <RouterLink class="btn btn--white btn--margin-bottom" to="/">
        Inbox ({{ countOfInboxMails }})
      </RouterLink>
      <RouterLink class="btn btn--white" to="/archive">
        Archive ({{ countOfArchivedMails }})
      </RouterLink>
    </nav>
    <button class="btn btn--white btn--bottom">Logout</button>
  </header>
</template>
