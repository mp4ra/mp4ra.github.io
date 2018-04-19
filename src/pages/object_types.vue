<main role="main" class="container">
  <h1>Object Types</h1>
  <p>
    This section documents the ObjectTypeIndication used in MPEG-4
    systems to indicate the type of streams. Applications for a new
    codec type will also automatically receive an object type indication.
  </p>
  <p>
    This table also occurs in ISO/IEC 14496-1 (various versions),
    the MPEG-4 systems specification. The intent is that the table
    maintained by this registration authority is the most up-to-date and
    definitive version.
  </p>
  <p>
    There is also an informative table of the current <a href="#streams">StreamType</a> allocations.
  </p>
  <p>
    The values in both these tables are notated here in <em>hexadecimal</em>.
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.oti.db"></table>
  <ol>
    <li type="a"><a name="obj-a"></a>
      This type is used for all 14496-1 streams unless specifically
      indicated to the contrary. Scene Description scenes, which are
      identified with StreamType=03 (see Table 9&nbsp;), using this object
      type value shall use the BIFSConfig specified in section 9.3.5.2.2 &nbsp;of
      this specification.
    </li>
    <li type="a"><a name="obj-b"></a>
      Used, with StreamType=03 (see Table 9&nbsp;), for Scene Description
      streams that use the BIFSv2Config. Its use with other StreamTypes is
      reserved&nbsp;.</li>
    <li type="a"><a name="obj-c"></a>
      Includes associated Amendment(s) and Corrigendum(a). The actual object
      types are defined in ISO/IEC 14496-2 and are conveyed in the
      DecoderSpecificInfo as specified in ISO/IEC 14496-2, Annex K.
    </li>
    <li type="a"><a name="obj-d"></a>
      Includes associated Amendment(s) and Corrigendum(a). The actual object
      types are defined in ISO/IEC 14496-3 and are conveyed in the
      DecoderSpecificInfo as specified in ISO/IEC 14496-3 subpart 1
      subclause 6.2.1.
    </li>
    <li type="a"><a name="obj-e"></a>
      Streams with this value with a StreamType indicating a systems stream
      (values 1,2,3, 6, 7, 8, 9) shall be treated as if the ObjectTypeIndication
      had been set to 01.
    </li>
    <li type="a"><a name="obj-f"></a>
      For PNG Streams, the following configuration/rules apply:

    <ul>
      <li type="disc">StreamType: 04 (visual)</li>
      <li type="disc">No decoder specific info needed</li>
      <li type="disc">The PNG stream shall consist in only one (1) AccessUnit</li>
      <li type="disc">The PNG stream access unit shall contain the complete PNG image/file</li>
      <li type="disc">MNG shall not be used inside PNG streams</li>
    </ul>

    <li type="a"><a id="obj-g" name="obj-g"></a>
      Includes associated Amendment(s) and Corrigendum(a). The actual object
      types are defined in ITU-T Recommendation H.264 | ISO/IEC 14496-10 and
      are conveyed in the DecoderSpecificInfo.
    </li>
    <li type="a"><a id="obj-h" name="obj-h"></a>
      Used, &nbsp;with StreamType=03, for Scene Description streams that use
      the BIFSConfigEx; its use with other StreamTypes is reserved. (Was
      previously reserved for MUCommandStream but not used for that purpose.)
    </li>
    <li type="a"><a id="obj-i" name="obj-i"></a>
      Used, &nbsp;with StreamType=03, for Scene Description streams that use
      the AFXConfig; its use with other StreamTypes is reserved.
    </li>
  </ol>
  <table id="streams" is="mp4ra-table" v-bind:columns="['code', 'description']" v-bind:data="mp4ra.stream_types.db"></table>
</main>
