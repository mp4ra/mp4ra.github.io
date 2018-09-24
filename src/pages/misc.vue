<main role="main" class="container">
  <h1>Miscellaneous</h1>
  <p>
    This section documents various codes used in the file format;
    handler codes (that declare track types) and sample group types, in particular.
    <ul>
      <li><a href="#handlers">Handlers</a></li>
      <li><a href="#data_references">Data References</a></li>
      <li><a href="#item_references">Item References</a></li>
      <li><a href="#multiview_attributes">Multiview Attributes</a></li>
      <li><a href="#schemes">Protection and Restricted Schemes</a></li>
      <li><a href="#sample_groups">Sample Groups</a></li>
      <li><a href="#track_selection">Track Selection Types</a></li>
      <li><a href="#track_group">Track Group Types</a></li>
      <li><a href="#entity_group">Entity Group Types</a></li>
      <li><a href="#color">Color Types</a></li>
    </ul>
  </p>
  <p>
    <h2><a name="handlers"></a>Handlers</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.handlers.db"></table>
  <ol>
    <li>There only exists a defined set of handler code-points in MP4 file format allowing declaration of most known MPEG-4 Systems streams. However there is no provision for private MPEG-4 streams, which may be used by the file creator. This will likely push the file creator into using one of the defined handler types, which is wrong and may corrupt processing by some file readers. This is a generic handler type to indicate that the media is an MPEG-4 systems stream, without further details on the stream type itself. The associated sample descriptions must still remain the same, i.e. &quot;mp4s&quot; as used with all MPEG-4 systems streams.</li>
  </ol>
  <p>
    <h2><a name="data_references"></a>Data References</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.data_references.db"></table>
  <p>
    <h2><a name="item_references"></a>Item References</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.item_references.db"></table>
  <p>
    <h2><a name="multiview_attributes"></a>Multiview Attributes</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.multiview_attributes.db"></table>
  <p>
    <h2><a name="schemes"></a>Protection and Restricted Schemes</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.schemes.db"></table>
  <p>
    <h2><a name="sample_groups"></a>Sample Groups</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.sample_groups.db"></table>
  <p>
    <h2><a name="track_selection"></a>Track Selection Types</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.track_selection.db"></table>
  <p>
    <h2><a name="track_group"></a>Track Group Types</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.track_groups.db"></table>
  <p>
    <h2><a name="entity_group"></a>Entity Group Types</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.entity_groups.db"></table>
  <p>
    <h2><a name="color"></a>Color Types</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.color_types.db"></table>
</main>
