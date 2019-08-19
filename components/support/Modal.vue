<template>
  <div class="modal-wrapper">
    <div class="modal-top">
      <img src="img/hapi.svg" alt="hapi-logo" class="modal-logo">
      <img src="img/close/png" alt="close" class="modal-close">
    </div>
    <div class="modal-middle">
      <div>Commercial support plan contact form</div>
      <label for="name" class="modal-label">Name</label>
      <input type="text" name="name" id="name" class="modal-input">
      <label for="company" class="modal-label">Company</label>
      <input type="text" name="company" id="company" class="modal-input">
      <label for="email" class="modal-label">Email</label>
      <input type="text" name="email" id="email" class="modal-input">
      <label for="message" class="modal-label">Message</label>
      <textarea name="message" id="message" cols="30" rows="10"></textarea>
      <button class="modal-button">Submit</button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";

.modal-wrapper {
  position: absolute;
}

</style>