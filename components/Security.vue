<template>
  <div class="page-container">
    <div class="security-upper-wrapper" id="security">
    <div class="quote-wrapper">
        <div class="quote">"At Brave, developing web services with hapi allows
           us to focus on the many problems to be solved, not on the details of
            the tool being used. hapi provides the right set of core APIs and 
            extensible plugins to support the requirements of a modern service 
            - session management, security, connectivity, and testing."</div>
        <div class="quote-container">
          <div class="quote-text">
            <div class="quote-author">- Brendan Eich</div>
            <div class="quote-company">Creator of JavaScript & CEO, Brave</div>
          </div>
          <div class="quote-img-container">
            <img class="quote-img" src="/img/brave-logo.svg" alt="brave-logo">
          </div>
        </div>
    </div>
    <h2 class="security-heading">Trusted for Simplicity, Security, and Satisfaction</h2>
    <div class="security-content">
        83% of developers* are concerned with the security of open-source code.
        You’re probably among that 83%.
    </div>
    <div class="security-percent">* npm Inc. 2019 Trends in JavaScript report</div>
    </div>
    <div class="security-middle-wrapper">
    <h3 class="security-heading">You’ve got nothing to worry about with hapi.</h3>
    <div class="security-content">
        When you
        <span class="code">npm install @hapi/hapi</span>, every single line of code you get has been verified. You
        never have to worry about some deep dependency being poorly maintained (or handed over to
        someone sketchy). hapi is the only leading node framework without any external code dependencies.
        None.
    </div>
    </div>
    <div class="security-lower-wrapper">
    <h3 class="security-heading">How do we keep hapi secure?</h3>
    <ul class="security-list">
        <li class="content-list">
        <span class="bold">End-to-end Code Hygiene</span> — hapi requires the most secure settings to manage, control, and distribute
        code, including 2FA for all contributors.
        </li>
        <li class="content-list">
        <span class="bold">Secure Defaults, Updated Regularly</span> — every hapi component comes with the most secure defaults
        out-of-the-box. Along with protecting server load with payload limits and request timeouts, hapi
        blocks error messages that could leak information or echo back exploits.
        </li>
        <li class="content-list">
        <span class="bold">Integrated Authorization and Authentication Architecture</span> — the most comprehensive authorization
        and authentication API available in a Node framework.
        </li>
        <li class="content-list">
        <span class="bold">Advanced Features</span> — with encrypted and signed cookies, secret or key rotation, and HTTP security
        headers, there are no excuses for building insecure applications.
        </li>
        <li class="content-list">
        <span class="bold">Reliable, Predictable Ownership</span> – when something goes wrong, you know who to contact. Security
        updates are handled under a strict, well-defined protocol.
        </li>
        <li class="content-list">
        <span class="bold">Rich ecosystem</span> – hapi’s extensive set of official plugins means no more blindly trusting some
        middleware you found for critical functionality just because it has a high count on npm.
        </li>
        <li class="content-list">
        <span class="bold">In-house Security Expertise</span> – created by Eran Hammer, the author of the OAuth specifications and
        other identity protocols.
        </li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

.security-upper-wrapper {
  position: relative;
  text-align: center;
}

.security-percent {
  position: absolute;
  bottom: -25px;
  right: 0;
  font-size: 0.75em;
}

.security-middle-wrapper {
  margin: 30px 0;
}

.security-heading {
  text-align: center;
  font-weight: 900;
  margin: 40px 0;
}
</style>