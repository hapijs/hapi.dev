<template>
  <modal
    name="confirmation"
    :clickToClose="false"
    :adaptive="true"
    :width="500"
    :height="700"
    :pivotX="0"
    :pivotY="0.28"
    :reset="true"
  >
    <div class="modal-wrapper">
      <div class="modal-top">
        <img src="/img/hapi.svg" alt="hapi-logo" class="modal-logo" />
        <img src="/img/close.png" v-on:click="closeConfirmation" alt="close" class="modal-close" />
      </div>
      <div class="modal-description">Thank You!</div> 
      <div class="modal-middle"> 
        <div
          class="confirmation-text"
        >Your submission has been received. We will contact you shortly.</div>
      </div>
      <div class="modal-bottom">
        <img src="/img/helmet.png" alt="helmet" class="modal-helmet" />
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  methods: {
    closeConfirmation() {
      this.$modal.hide("confirmation");
      this.$cookies.set("confirmation", false);
    }
  }
};
</script>
