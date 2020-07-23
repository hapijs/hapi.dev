<template>
  <footer class="footer">
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
          target="__blank"
          href="https://twitter.com/hapijs"
          >Twitter</a
        >
      </li>
      <li class="footer-links-li">
        <a
          class="footer-link"
          title="Slack"
          target="__blank"
          href="https://join.slack.com/t/hapihour/shared_invite/zt-g5ortpsk-ErlnRA2rUcPIWES21oXBOg"
          >Slack</a
        >
      </li>
    </ul>
    <div class="footer-text-wrapper">
      <a class="netlify-link" href="https://www.netlify.com" name="Netlify">
        <img
          class="netlify"
          src="https://www.netlify.com/img/global/badges/netlify-dark.svg"
          alt="Netlify Logo"
        />
      </a>
      <div class="footer-text">&copy; 2012 - {{ year }} Sideway Inc.</div>
    </div>
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
  background-color: $white;
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
  margin: 0;
  padding-bottom: 5px;
}

.footer-text-links:hover {
  color: $orange;
  text-decoration: underline;
}

.footer-text-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0 15px 0;
}

.netlify-link {
  padding-right: 10px;
  margin: 0;
}

.netlify {
  max-width: 50px;
}
</style>
