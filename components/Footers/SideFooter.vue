<template>
  <footer class="side-footer">
    <ul class="footer-links">
      <li class="footer-links-li">
        <a
          class="footer-link"
          title="GitHub"
          target="__blank"
          href="https://github.com/hapijs/hapi"
          >GitHub</a
        >
      </li>
      <li class="footer-links-li">
        <a
          class="footer-link"
          title="Twitter"
          target="_blank"
          href="https://twitter.com/hapijs"
          >Twitter</a
        >
      </li>
      <li class="footer-links-li">
        <a
          class="footer-link"
          title="Slack"
          target="__blank"
          href="https://join.slack.com/t/hapihour/shared_invite/enQtNTA5MDUzOTAzOTU4LTY1YzY0ZDM4YTZkNzYzOGExNDYzZjQ3YzJkNTVhNmExMDdlMjY3NDhkNDUxNjU4NTY1YjkzMTcxMzBkMzFiNWE"
          >Slack</a
        >
      </li>
    </ul>
    <div class="footer-text">&copy; 2012 - {{ year }} Sideway Inc.</div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

a {
  color: $orange;
  text-decoration: none;
}

.footer-links {
  list-style-type: none;
  margin: 0 auto 3px auto;
  width: 100%;
  text-align: center;
}

.footer-links-li {
  display: inline-block;
  padding: 0 10px;
  font-size: 0.8em;
  margin: 0;
}

.footer-link:hover {
  color: $orange;
  text-decoration: underline;
}

.index-about {
  font-weight: 700;
  font-size: 0.75em;
  flex-wrap: wrap;
  margin-bottom: 10px;
  line-height: 30px;
}

.index-about-link:hover {
  color: $orange;
  text-decoration: underline;
}

.index-about:nth-child(-n + 5) {
  padding-right: 10px;
}

.index-about-link {
  cursor: pointer;
}

.index-divider {
  padding: 0 5px;
}

.side-footer {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  max-width: 100%;
  margin: 20px 10px 0 10px;
}

.footer-text {
  text-align: center;
}

.footer-text-links:hover {
  color: $orange;
  text-decoration: underline;
}

@media screen and (max-width: 900px) {
  .side-footer {
    display: none;
  }
}
</style>
