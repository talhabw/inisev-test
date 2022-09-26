<script>
import { mapActions } from "pinia";
import { useMailsStore } from "../stores/mails";

export default {
  props: {
    mails: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openDetails(id) {
      this.$emit("openDetails", id);
    },
    ...mapActions(useMailsStore, ["toggleChecked"]),
  },
};
</script>

<template>
  <ul class="list">
    <li
      v-for="mail in mails"
      :key="mail.id"
      @click="openDetails(mail.id)"
      :class="[mail.isRead ? 'list__mail--read' : '', 'list__mail']"
    >
      <input
        @click.stop
        @change="toggleChecked(mail.id)"
        class="checkbox"
        type="checkbox"
        :checked="mail.isChecked"
      />
      <p>{{ mail.title }}</p>
    </li>
  </ul>
</template>
