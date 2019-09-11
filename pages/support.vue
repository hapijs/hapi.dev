<template>
  <div class="support-wrapper">
    <Form />
    <Confirmation />
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
import Form from "~/components/support/Form.vue";
import Confirmation from "~/components/support/Confirmation.vue";

export default {
  layout: "noSide", 
  components: {
    howToHelp,
    commercialSupport,
    commercialLicense,
    Table,
    Form,
    Confirmation
  },
  head() {
    return {
      title: "hapi.js - Support"
    };
  },
  methods: {

  },
  created() {
    this.$store.commit("setDisplay", "support");
  },
  mounted() {
    if (this.$cookies.get("confirmation")) {
      this.$modal.show("confirmation");
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

.support-wrapper {
  max-width: 1070px;
  width: 100%;
  margin: 0 auto;
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

.confirmation-text {
  text-align: center;
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

  .modal-input {
    height: 30px;
  }

  .modal-text {
    height: 75px;
  }

  .modal-logo {
    width: 100px;
  }

  .modal-bottom {
    display: none;
  }
}
</style>
