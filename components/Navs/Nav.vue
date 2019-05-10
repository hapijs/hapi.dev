<template>
  <nav role="navigation" class="navbar">
    <div class="nav-container">
      <a class="logo" href="/" title="Back to home"/>
      <div class="nav-collapse">
        <ul class="nav-links">
          <li class="nav-links-li">
            <a class="nav-link" title="Tutorials" href="/tutorials">Tutorials</a>
          </li>
          <li class="nav-links-li">
            <a class="nav-link" title="API" href="/api">API</a>
          </li>
          <li class="nav-links-li">
            <a class="nav-link" title="Resources" href="/resources">Resources</a>
          </li>
          <li class="nav-links-li">
            <a class="nav-link" title="Plugins" href="/plugins">Plugins</a>
          </li>
          <li class="nav-links-li">
            <a class="nav-link" title="Contribute" href="/contribute">Contribute</a>
          </li>
          <li class="nav-links-li">
            <a class="nav-link" title="Updates" href="/updates">Updates</a>
          </li>
          <li class="nav-links-li">
            <a class="nav-link" title="Help" href="/help">Help</a>
          </li>
        </ul>
      </div>
      <a href="javascript:void(0);" class="hamburger">
        <span class="hamburger-line hamburger-line-upper"/>
        <span class="hamburger-line hamburger-line-middle"/>
        <span class="hamburger-line hamburger-line-lower"/>
      </a>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";

.navbar {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 10px 50px;
  background: #fff;
}

.nav-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  background: url("/hapi.svg") no-repeat 0 0;
  background-size: contain;
  height: 75px;
  width: 100px;
  margin: 0;
}

.nav-collapse {
  margin: 0;
}

.nav-links {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links-li {
  display: inline-block;
  margin: 0;
}

.nav-link {
  position: relative;
  margin: 10px;
  color: $orange;
  font-weight: 700;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 5px 0;
  text-decoration: none;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}

.nav-link:hover {
  color: $orange;
}

.nav-link:before {
  width: 0;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: $orange;
  -webkit-transition: 0.15s linear;
  transition: 0.15s linear;
}

.nav-link:after {
  width: 0;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: $orange;
  -webkit-transition: 0.15s linear;
  transition: 0.15s linear;
}

.nav-link:hover:after,
.nav-link:hover:before {
  width: 100%;
}

.hamburger {
  position: absolute;
  display: none;
}

.hamburger-line {
  display: block;
  margin: 5px 0;
  width: 20px;
  height: 2px;
  border-radius: 5px;
  background: $black;
}

@media screen and (max-width: 900px) {
  .navbar {
    position: fixed;
    top: 0;
    height: 50px;
    width: 100%;
    padding: 5px 0 0 0;
    border-bottom: 1px solid #ddd;
  }

  .logo {
    height: 50px;
    width: calc(100px * (2 / 3));
  }

  .nav-collapse {
    display: none;
  }

  .hamburger {
    display: inline-block;
    left: 20px;
    top: 12px;
  }
}
</style>
