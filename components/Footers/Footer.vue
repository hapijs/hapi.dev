<template>
  <footer class="footer">
    <ul class="footer-links">
      <li class="footer-links-li">
        <a class="footer-link" title="Tutorials" href="/tutorials">Tutorials</a>
      </li>
      <li class="footer-links-li">
        <a class="footer-link" title="API" href="/api">API</a>
      </li>
      <li class="footer-links-li">
        <a class="footer-link" title="Ecosystem" href="/ecosystem">Ecosystem</a>
      </li>
      <li class="footer-links-li">
        <a class="footer-link" title="Plugins" href="/plugins">Plugins</a>
      </li>
      <li class="footer-links-li">
        <a class="footer-link" title="Help" href="/help">Help</a>
      </li>
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
  margin: 0 auto 10px auto;
  width: 100%;
  text-align: center;
}

.footer-links-li {
  display: inline-block;
  margin: 0;
}

.footer-links-li:nth-child(-n + 7) {
  padding-right: 10px;
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
