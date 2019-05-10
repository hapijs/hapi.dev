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
        <a class="footer-link" title="Resources" href="/resources">Resources</a>
      </li>
      <li class="footer-links-li">
        <a class="footer-link" title="Plugins" href="/plugins">Plugins</a>
      </li>
      <li class="footer-links-li">
        <a class="footer-link" title="Updates" href="/updates">Updates</a>
      </li>
      <li class="footer-links-li">
        <a class="footer-link" title="Github" href="/help">Github</a>
      </li>
      <li class="footer-links-li">
        <a class="footer-link" title="Twitter" href="/help">Twitter</a>
      </li>
      <li class="footer-links-li">
        <a class="footer-link" title="Help" href="/help">Help</a>
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
      <a class="footer-text-links" target="__blank" href="https://packet.net">packet.net</a>
      for our hosting.
    </div>
  </footer>
</template>

<script>
export default {}
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
}

.footer-links {
  list-style-type: none;
  margin: 0 auto 10px auto;
  width: 100%;
  text-align: center;
}

.footer-links-li {
  display: inline-block;
}

li:nth-child(-n + 7) {
  padding-right: 10px;
}

.footer-link:hover {
  color: $orange;
  text-decoration: underline;
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
