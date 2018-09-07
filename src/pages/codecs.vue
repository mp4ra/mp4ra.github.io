<main role="main" class="container">
  <h1>Codecs</h1>
  <p>
    This section documents the code-points used to identify codecs, or sample
    (access unit) formats. These are the four-character codes of sample
    entries (sample descriptions) in ISO media files.
  </p>
  <p>
    There is also a table of <a href="#seboxes">boxes</a> that are stored
    in the sample entries for various track types.
  </p>
  <p>
    Requests for a code-point in this area should identify the specification
    of the coding system, as well as the specification where the code-point
    is defined. The definition of the code-point should document the sample
    (access unit) format as well as the sample entry (sample description)
    format. Note that extra boxes (atoms) within the sample entry, which are
    specific to that coding system, need not be, and usually are not,
    registered.
  </p>
  <p>
    Requests for a code-point in this area will normally also cause an
    objectTypeIndication to be allocated, so that the coding system can be
    used in MPEG-4 systems. Please indicate if this is not desirable.
  </p>
  <p>
    <b>Note well</b>:  the existence of an ObjectType identification here
    does not document in which contexts, if any, that code-point may be used.
    The documentation must be consulted.
  </p>
  <p>
    <h2>Sample Entry Codes Registered to ISO</h2>
    <h5>(see <a href="#qtcodecs">below</a> for QuickTime code points)</h5>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'handler', 'specification', 'ObjectType']" v-bind:data="mp4ra.sample_entries.db"></table>
  <p>
    <h2>Metadata Item Type Codes Registered to ISO</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.item_types.db"></table>
  <p>
    <h2>Metadata Item Properties Registered to ISO</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.item_properties.db"></table>
  <p>
    <a name="seboxes"></a>
    <h2>Box types contained in specific Sample Entries</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'handler', 'specification']" v-bind:data="mp4ra.sample_entries_boxes.db"></table>
  <ol>
    <li>
        See the color information in the <router-link to="/handler">'misc'</router-link> 
        tables for the contents of the color information box.
    </li>
  </ol>
  <p>
    <a name="qtcodecs"></a>
    <h2>Sample Entry Codes Registered for QuickTime</h2>
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'handler', 'specification']" v-bind:data="mp4ra.sample_entries_qt.db"></table>
</main>
