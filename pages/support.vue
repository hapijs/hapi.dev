<template>
  <div class="support-wrapper">
    <modal
      name="form"
      :clickToClose="false"
      :width="500"
      :height="700"
      :pivotX="0"
      :pivotY="0.28"
      :reset="true"
    >
      <div class="modal-wrapper">
        <div class="modal-top">
          <img src="img/hapi.svg" alt="hapi-logo" class="modal-logo" />
          <img src="img/close.png" v-on:click="closeModal" alt="close" class="modal-close" />
        </div>
        <div class="modal-description">Commercial support plan contact form</div>
        <div class="modal-middle">
          <label for="name" class="modal-label">Name</label>
          <input type="text" name="name" id="name" class="modal-input" />
          <label for="company" class="modal-label">Company</label>
          <input type="text" name="company" id="company" class="modal-input" />
          <label for="email" class="modal-label">Email</label>
          <input type="text" name="email" id="email" class="modal-input" />
          <label for="message" class="modal-label">Message</label>
          <textarea name="message" id="message" class="modal-text"></textarea>
          <button class="modal-button">Submit</button>
        </div>
        <div class="modal-bottom">
          <img src="img/helmet.png" alt="helmet" class="modal-helmet">
        </div>
      </div>
    </modal>
    <howToHelp />
    <commercialSupport />
    <commercialLicense />
    <Table />
  </div>
</template>

<script>
import howToHelp from "~/components/support/howToHelp.vue";
import commercialSupport from "~/components/support/commercialSupport.vue";
import commercialLicense from "~/components/support/commercialLicense.vue";
import Table from "~/components/support/Table.vue";

export default {
  layout: "noSide",
  components: {
    howToHelp,
    commercialSupport,
    commercialLicense,
    Table
  },
  data: function() {
    return {
      modal: true
    };
  },
  head() {
    return {
      title: "hapi.js - Help"
    };
  },
  methods: {
    closeModal() {
      this.$modal.hide('form')
    }
  },
  created() {
    this.$store.commit("setDisplay", "support");
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

.support-wrapper {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 0 60px;
  font-size: 1.2rem;
}

.support-main-heading {
  text-align: center;
  font-weight: 900;
  margin: 40px 0;
}

.support-minor-heading {
  text-align: center;
  font-weight: 900;
  margin: 40px 0 0 0;
}

.support-content {
  margin: 10px 0;
}

.support-button-wrapper {
  margin: 30px auto 80px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.support-button {
  border-radius: 10px;
  border: none;
  background: $orange;
  padding: 7px 15px;
  font-size: 0.9em;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0);
}

.support-button:hover {
  border: 4px solid $orange;
  background: #fff;
  color: $orange;
  text-decoration: none;
  transition: all 0.3s ease 0s;
}

.modal-top {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-logo {
  width: 150px;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 25px;
}

.modal-description {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid $dark-white;
}

.modal-label {
  margin: 0;
}

.modal-input {
  width: 100%;
  height: 30px;
  padding: 5px;
  margin-bottom: 10px;
}

.modal-text {
  width: 100%;
  height: 125px;
  margin-bottom: 20px;
  resize: none;
  padding: 5px;
}

.modal-middle {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
}

.modal-button {
  border-radius: 10px;
  border: none;
  background: $orange;
  padding: 5px 15px;
  font-size: 0.9em;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0);
}

.modal-button:hover {
  border: 4px solid $orange;
  background: #fff;
  color: $orange;
  text-decoration: none;
  transition: all 0.3s ease 0s;
}

.modal-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid $dark-white;
}

.modal-helmet {
  width: 40px;
}

@media screen and (max-width: 900px) {
  .support-wrapper {
    padding: 0 20px;
    font-size: 1.1em;
  }
}
</style>
