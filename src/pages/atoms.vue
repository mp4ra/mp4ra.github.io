<main role="main" class="container">
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="boxes"></table>
  <p>
    <b>User-data Codes</b>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="boxes_udta"></table>
  <p>
    <b>QuickTime Codes</b>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="boxes_qt"></table>
</main>
