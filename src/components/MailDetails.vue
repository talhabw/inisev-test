<script>
import { mapState, mapActions } from "pinia";
import { useMailsStore } from "../stores/mails";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(useMailsStore, ["getMailById"]),
  },
  methods: {
    closeDetails() {
      this.$emit("closeDetails");
    },
    ...mapActions(useMailsStore, ["markAsRead", "archive", "unarchive"]),
  },
  created() {
    document.addEventListener("keyup", (e) => {
      console.log("save", e.key);
      if (e.key === "r") {
        this.markAsRead(this.id);
        console.log(this.id);
      } else if (e.key === "a") {
        if (this.getMailById(this.id).label == "archived") {
          this.unarchive(this.id);
        } else {
          this.archive(this.id);
        }
      } else if (e.key === "Escape") {
        this.closeDetails();
      }
      e.stopPropagation();
      e.preventDefault();
    });
  },
};
</script>

<template>
  <div class="modal">
    <div class="modal__content">
      <button @click="closeDetails" class="btn btn--gray btn--margin-right">
        Close (esc)
      </button>
      <button @click="markAsRead(id)" class="btn btn--gray btn--margin-right">
        Mark as read (r)
      </button>
      <button
        v-if="getMailById(id).label == 'archived'"
        @click="unarchive(id)"
        class="btn btn--gray btn--margin-right"
      >
        Unarchive (a)
      </button>
      <button
        v-else
        @click="archive(id)"
        class="btn btn--gray btn--margin-right"
      >
        Archive (a)
      </button>

      <div class="modal__header">
        <h2>{{ getMailById(id).title }}</h2>
      </div>
      <div class="modal__body">
        <p>{{ getMailById(id).content }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal__content {
  background-color: #fff;
  width: 50%;
  height: 100%;
  margin-left: auto;
  padding: 20px;
}
</style>
