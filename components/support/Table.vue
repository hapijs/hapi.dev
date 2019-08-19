<template>
  <div class="support-table-wrapper">
    <div id="plans"></div>
    <h2 class="support-main-heading">Find the plan that's right for you!</h2>
    <div class="table-wrapper">
      <table>
        <tr>
          <th></th>
          <th class="bold">Core</th>
          <th class="bold">Plus</th>
          <th class="bold">Enterprise</th>
        </tr>
        <tr>
          <td>
            Cost
            <span class="table-span">(paid annually)</span>
          </td>
          <td>$95/month</td>
          <td>$749/month</td>
          <td>$1,995/month</td>
        </tr>
        <tr>
          <td>Number of developers</td>
          <td>Unlimited</td>
          <td>Unlimited</td>
          <td>Unlimited</td>
        </tr>
        <tr>
          <td>hapi versions</td>
          <td>v18</td>
          <td>v18, v17</td>
          <td>v18, v17, v16</td>
        </tr>
        <tr>
          <td>Version lock-in</td>
          <td>-</td>
          <td>2 years</td>
          <td>5 years</td>
        </tr>
        <tr>
          <td>Additional lock-in years</td>
          <td>-</td>
          <td>-</td>
          <td>Price upon request</td>
        </tr>
        <tr>
          <td>Enterprise plugs</td>
          <td>Included</td>
          <td>Included</td>
          <td>Included</td>
        </tr>
        <tr>
          <td>Max-response time for GitHub issues</td>
          <td>3 business days</td>
          <td>3 business days</td>
          <td>2 business days</td>
        </tr>
        <tr>
          <td>
            Private priority issues
            <span class="table-span">(Up to 2 business days response time)</span>
          </td>
          <td>-</td>
          <td>5 issues/month</td>
          <td>10 issues/month</td>
        </tr>
        <tr>
          <td>
            Private critical issues
            <span class="table-span">(Up to 24 hours response time)</span>
          </td>
          <td>-</td>
          <td>-</td>
          <td>3 issues/month</td>
        </tr>
        <tr>
          <td>Advance security notifactions</td>
          <td>24 hours</td>
          <td>48 hours</td>
          <td>72 hours</td>
        </tr>
        <tr>
          <td>Security patch preview</td>
          <td>-</td>
          <td>Included</td>
          <td>Included</td>
        </tr>
        <tr>
          <td>Private Slack channel</td>
          <td>-</td>
          <td>-</td>
          <td>Included</td>
        </tr>
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
}

th {
  font-size: 1.4rem;
}

td {
  padding: 10px 5px;
  height: 76px;
}

tr:nth-child(even) {
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