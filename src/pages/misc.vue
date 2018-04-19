<main role="main" class="container">
  <h1>Misc</h1>
  <p>This section documents various codes used in the file format; handler codes (that declare track types) and sample group types, in particular.
  </p>
  <p>
    <h2>Handlers</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.handlers.db"></table>
  <ol>
    <li>There only exists a defined set of handler code-points in MP4 file format allowing declaration of most known MPEG-4 Systems streams. However there is no provision for private MPEG-4 streams, which may be used by the file creator. This will likely push the file creator into using one of the defined handler types, which is wrong and may corrupt processing by some file readers. This is a generic handler type to indicate that the media is an MPEG-4 systems stream, without further details on the stream type itself. The associated sample descriptions must still remain the same, i.e. &quot;mp4s&quot; as used with all MPEG-4 systems streams.</li>
  </ol>
  <p>
    <h2>Data References</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.data_references.db"></table>
  <p>
    <h2>Item References</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.item_references.db"></table>
  <p>
    <h2>Multiview Attributes</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.multiview_attributes.db"></table>
  <p>
    <h2>Protection and Restricted Schemes</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.schemes.db"></table>
  <p>
    <h2>Sample Groups</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.sample_groups.db"></table>
  <p>
    <h2>Track Selection Types</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.track_selection.db"></table>
  <p>
    <h2>Track Group Types</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.track_groups.db"></table>
  <p>
    <h2>Color Types</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.color_types.db"></table>
</main>
