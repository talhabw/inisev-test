import { defineStore } from "pinia";

export const useMailsStore = defineStore("mails", {
  state: () => ({
    /** @type {{ id: number, title: string, content: string, isRead: boolean, label: string, isChecked: boolean }[]} */
    mails: [
      {
        id: 1,
        title: "1 Lorem ipsum dolor sit amet 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet nisl.",
        isRead: false,
        label: "inbox",
        isChecked: false,
      },
      {
        id: 2,
        title: "2 Lorem ipsum dolor sit amet 2",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        isRead: false,
        label: "inbox",
        isChecked: false,
      },
      {
        id: 3,
        title: "3 Lorem ipsum dolor sit amet 3",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        isRead: true,
        label: "inbox",
        isChecked: false,
      },
      {
        id: 4,
        title: "4 Lorem ipsum dolor sit amet 3",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        isRead: true,
        label: "inbox",
        isChecked: false,
      },
      {
        id: 5,
        title: "5 Lorem ipsum dolor sit amet 3",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        isRead: true,
        label: "inbox",
        isChecked: false,
      },
      {
        id: 6,
        title: "6 Lorem ipsum dolor sit amet 3",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        isRead: true,
        label: "inbox",
        isChecked: false,
      },
    ],
  }),
  getters: {
    inboxMails(state) {
      return state.mails.filter((mail) => mail.label == "inbox");
    },
    archivedMails(state) {
      return state.mails.filter((mail) => mail.label == "archived");
    },
    selectedInboxMailsCount(state) {
      return state.mails.filter(
        (mail) => mail.isChecked && mail.label == "inbox"
      ).length;
    },
    selectedArchivedMailsCount(state) {
      return state.mails.filter(
        (mail) => mail.isChecked && mail.label == "archived"
      ).length;
    },
    countOfInboxMails(state) {
      return state.mails.filter((mail) => mail.label == "inbox").length;
    },
    countOfArchivedMails(state) {
      return state.mails.filter((mail) => mail.label == "archived").length;
    },
    getMailById: (state) => (id) => {
      return state.mails.find((mail) => mail.id == id);
    },
  },
  actions: {
    toggleRead(id) {
      const mail = this.mails.find((mail) => mail.id == id);
      mail.isRead = !mail.isRead;
    },
    toggleChecked(id) {
      const mail = this.mails.find((mail) => mail.id == id);
      mail.isChecked = !mail.isChecked;
    },
    toggleAll(label, checked) {
      this.mails.forEach((mail) => {
        if (mail.label == label) {
          mail.isChecked = checked;
        }
      });
    },
    markAsReadSelectedInboxMails() {
      this.mails.forEach((mail) => {
        if (mail.isChecked && mail.label == "inbox") {
          mail.isRead = true;
        }
      });
    },
    archiveSelectedMails() {
      this.mails.forEach((mail) => {
        if (mail.isChecked && mail.label == "inbox") {
          mail.label = "archived";
          mail.isChecked = false;
        }
      });
    },
    markAsReadSelectedArchiveMails() {
      this.mails.forEach((mail) => {
        if (mail.isChecked && mail.label == "archived") {
          mail.isRead = true;
        }
      });
    },
    unarchiveSelectedMails() {
      this.mails.forEach((mail) => {
        if (mail.isChecked && mail.label == "archived") {
          mail.label = "inbox";
          mail.isChecked = false;
        }
      });
    },
    markAsRead(id) {
      const mail = this.mails.find((mail) => mail.id == id);
      mail.isRead = true;
    },
    archive(id) {
      const mail = this.mails.find((mail) => mail.id == id);
      mail.label = "archived";
    },
    unarchive(id) {
      const mail = this.mails.find((mail) => mail.id == id);
      mail.label = "inbox";
    },
  },
});
