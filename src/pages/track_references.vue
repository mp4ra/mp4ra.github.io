<main role="main" class="container">
  <h1>Track references</h1>
  <p>
    This section documents the track-reference types, which link tracks with
    relationships between them. The link is typed with a code. These codes are
    documented here.
  </p>
  <p>
    <h2>ISO Family code points</h2>
    <h5>(see <a href="#qttrackref">below</a> for QuickTime code points)</h5>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.track_references.db"></table>
  <p>
    <a name="qttrackref"></a>
    <h2>QuickTime code-points</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.track_references_qt.db"></table>
</main>
