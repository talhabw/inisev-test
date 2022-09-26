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

<style>
.header {
  background-color: #363636;
  padding: 20px;
  width: 20%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

nav {
  display: flex;
  flex-direction: column;
}

.btn {
  padding: 7px 20px;
  border-radius: 5px;
  color: #363636;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
}

.btn--margin-bottom {
  margin-bottom: 10px;
}

.btn--white {
  background-color: #fff;
  border: 1px solid #f5f5f5;
}

.btn--bottom {
  margin-top: auto;
}

.checkbox {
  height: 20px;
  width: 20px;
}
</style>
