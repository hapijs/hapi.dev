<template>
  <div class="support-table-wrapper">
    <div id="plans"></div>
    <h2 class="support-main-heading">Find the plan that's right for you!</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th></th>
            <th class="bold">Community</th>
            <th class="bold">Core</th>
            <th class="bold">Plus</th>
            <th class="bold">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="table-feature">
              Cost
              <span class="table-span">(paid annually)</span>
            </td>
            <td>$0</td>
            <td>$95/month</td>
            <td>$749/month</td>
            <td>$1,995/month</td>
          </tr>
          <tr>
            <td class="table-feature">Number of developers</td>
            <td>Unlimited</td>
            <td>Unlimited</td>
            <td>Unlimited</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td class="table-feature">Public Slack channel</td>
            <td>&#10004;</td>
            <td>&#10004;</td>
            <td>&#10004;</td>
            <td>&#10004;</td>
          </tr>
          <tr>
            <td class="table-feature">GitHub issues support</td>
            <td>Community</td>
            <td>&#10004;</td>
            <td>&#10004;</td>
            <td>&#10004;</td>
          </tr>
          <tr>
            <td class="table-feature">
              Max response time for GitHub issues
              <span class="table-span">(business days)</span>
            </td>
            <td>-</td>
            <td><span class="bold">3 days</span></td>
            <td><span class="bold">3 days</span></td>
            <td><span class="bold">2 days</span></td>
          </tr>
          <tr>
            <td class="table-feature">hapi versions</td>
            <td>v18</td>
            <td>v18</td>
            <td>v18, <span class="bold">v17</span></td>
            <td>v18, <span class="bold">v17</span>, <span class="bold">v16</span></td>
          </tr>
          <tr>
            <td class="table-feature">Version lock-in</td>
            <td>-</td>
            <td>-</td>
            <td><span class="bold">2 years</span></td>
            <td><span class="bold">5 years</span></td>
          </tr>
          <tr>
            <td class="table-feature">Additional lock-in years</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>Price upon request</td>
          </tr>
          <tr>
            <td class="table-feature">Enterprise plugs</td>
            <td>-</td>
            <td>&#10004;</td>
            <td>&#10004;</td>
            <td>&#10004;</td>
          </tr>
          <tr>
            <td class="table-feature">
              Private priority issues/month
              <span
                class="table-span"
              >(Up to 2 business days response time)</span>
            </td>
            <td>-</td>
            <td><span class="bold">1</span></td>
            <td><span class="bold">5</span></td>
            <td><span class="bold">10</span></td>
          </tr>
          <tr>
            <td class="table-feature">
              Private critical issues/month
              <span class="table-span">(Up to 24 hours response time)</span>
            </td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td><span class="bold">3</span></td> 
          </tr>
          <tr>
            <td class="table-feature">Advance security notifications</td>
            <td>-</td>
            <td><span class="bold">24 hours</span></td>
            <td><span class="bold">48 hours</span></td>
            <td><span class="bold">72 hours</span></td>
          </tr>
          <tr>
            <td class="table-feature">Security patch preview</td>
            <td>-</td>
            <td>-</td>
            <td>&#10004;</td>
            <td>&#10004;</td> 
          </tr>
          <tr>
            <td class="table-feature">Private Slack channel</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>&#10004;</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="support-button-wrapper">
      <button
        class="support-button"
        aria-label="license-button"
        v-on:click="openModal"
      >Sign up for a commercial license plan</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openModal() {
      this.$modal.show("form");
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";

.table-span {
  display: block;
  font-size: .95rem;
}

.table-wrapper {
  overflow-x: auto;
}

#plans {
  position: relative;
  top: -116px;
}

table {
  width: 100%;
  margin-bottom: 20px;
  overflow-x: auto;
  font-size: 1.1rem;
}

table th {
  font-size: 1.3rem;
  text-align: center !important;
}

table td {
  padding: 10px 5px;
  height: 76px;
  text-align: center !important;
  vertical-align: middle;
  width: 192px;
}

.table-feature {
  text-align: left !important;
  width: auto !important;
}

tbody tr:nth-child(odd) {
  background-color: #fbe4d5;
}

@media screen and (max-width: 900px) {
  table {
    font-size: 0.8rem;
    margin-bottom: 0;
  }

  #plans {
    top: -55px;
  }
}
</style>