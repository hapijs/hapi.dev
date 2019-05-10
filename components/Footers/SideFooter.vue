<template>
  <footer class="footer">
    <div class="index-about">
      <a hfre="/security" class="index-about-link">Security</a>
      <span class="index-divider">|</span>
      <a hfre="/quality" class="index-about-link">Quality</a>
      <span class="index-divider">|</span>
      <a hfre="/developersfirst" class="index-about-link">Developers First</a>
      <span class="index-divider">|</span>
      <a hfre="/predictability" class="index-about-link">Predictability</a>
      <span class="index-divider">|</span>
      <a hfre="/Extensibility" class="index-about-link">Extensibility</a>
      <span class="index-divider">|</span>
      <a hfre="/Support" class="index-about-link">Support</a>
    </div>
    <div class="footer-text">
      hapi is maintained by the
      <a
        class="footer-text-links"
        target="__blank"
        href="https://github.com/orgs/hapijs/people"
      >core team</a>
      with help from
      <a
        class="footer-text-links"
        target="__blank"
        href="https://github.com/hapijs/hapi/graphs/contributors"
      >our contributors</a>
      and a very big thanks to
      <a
        class="footer-text-links"
        target="__blank"
        href="https://packet.net"
      >packet.net</a>
      for our hosting.
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";

a {
  color: $orange;
  text-decoration: none;
}

.index-about-link {
  cursor: pointer;
}

.index-divider {
  padding: 0 5px;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  max-width: 735px;
}

.footer-text {
  font-size: 0.8em;
  text-align: center;
}

.footer-text-links:hover {
  color: $orange;
  text-decoration: underline;
}
</style>