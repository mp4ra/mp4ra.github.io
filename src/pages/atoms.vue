<main role="main" class="container">
  <h1>Boxes (Atoms)</h1>
  <p>
    This sub-section documents the structural <em>atom or box type</em>s for
    the file formats. All files in this family are structured as a series of
    boxes (also known as atoms). Each box has a size and a four-character-code
    type. Boxes may contain other boxes.
  </p>
  <p>
    User-data types are in a separate table <a href="#userdata">below</a>.
  </p>
  <p>
    <h2>ISO family codes</h2>
    See <a href="#qtatom">below</a> for additional QuickTime codes.
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.boxes.db"></table>
  <p>
    <div id="userdata"><h2>User-data Codes</h2></div>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.boxes_udta.db"></table>
  <p>
    <div id="qtatom"><h2>QuickTime Codes</h2></div>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.boxes_qt.db"></table>
</main>
