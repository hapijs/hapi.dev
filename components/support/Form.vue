<template>
  <modal
    name="form"
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
        <img src="/img/close.png" v-on:click="closeModal" alt="close" class="modal-close" />
      </div>
      <div class="modal-description">Commercial support plan contact form</div>
      <div class="modal-middle">
        <form action="https://jumprock.co/mail/hapi" method="POST">
          <input type="hidden" name="after" value="https://hapi-support.netlify/support" />
          <input type="hidden" name="subject" value="hapi.dev license request" />
          <label for="name" class="modal-label">Name</label>
          <input type="text" name="name" id="name" class="modal-input" required />
          <label for="company" class="modal-label">Company</label>
          <input type="text" name="company" id="company" class="modal-input" required />
          <label for="email" class="modal-label">Email</label>
          <input type="text" name="email" id="email" class="modal-input" required />
          <label for="message" class="modal-label">Message</label>
          <textarea name="message" id="message" class="modal-text"></textarea>
          <button class="modal-button" type="submit" v-on:click="openConfirmation">Submit</button>
        </form>
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
    closeModal() {
      this.$modal.hide("form");
    },
    openConfirmation() {
      this.$modal.hide("form");
      this.$cookies.set("confirmation", true);
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";
</style>