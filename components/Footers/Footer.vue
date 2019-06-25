<template>
  <footer class="footer">
    <ul class="footer-links">
      <li class="footer-links-li">
        <a class="footer-link" title="Github" target="__blank" href="https://github.com/hapijs/hapi">Github</a>
      </li>
      <li class="footer-links-li">
        <a class="footer-link" title="Twitter" target="__blank" href="https://twitter.com/hapijs">Twitter</a>
      </li>
      <li class="footer-links-li">
        <a
          class="footer-link"
          title="Slack"
          target="__blank"
          href="https://join.slack.com/t/hapihour/shared_invite/enQtNTA5MDUzOTAzOTU4LTUyZmFiYjkyMTBmNDcyMmI2MmRjMzg4Y2YzNTlmNzUzNjViN2U1NmYyY2NjYjhiYWU4MGE2OTFhZDRlYWMyZDY"
        >Slack</a>
      </li>
    </ul>
    <div class="footer-text">
      &copy; 2012 - 2019 Sideway Inc.
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
  background-color: #fff;
  padding: 0 20px;
}

.footer-links {
  list-style-type: none;
  margin: 0 auto 3px auto;
  width: 100%;
  text-align: center;
}

.footer-links-li {
  display: inline-block;
  margin: 0;
  line-height: 1rem;
}

.footer-links-li:nth-child(-n + 2) {
  padding-right: 10px;
}

.footer-link {
  font-size: 1rem;
}

.footer-link:hover {
  color: $orange;
  text-decoration: underline;
}

.footer-text {
  font-size: 0.8em;
  text-align: center;
  padding-bottom: 15px;
}

.footer-text-links:hover {
  color: $orange;
  text-decoration: underline;
}

</style>
