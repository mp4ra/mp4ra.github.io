<main role="main" class="container">
  <h1>References</h1>
  <p>
    This section contains the information on where to find out more
    about a specific specification or the owner of a registered code-point.
  </p>
  <p>
    The specifications in this family are all &quot;atom&quot; or
    &quot;box&quot; structured file formats, which are intentionally
    interoperable.
  </p>
  <p>
    Most of the specifications are related to the first MPEG-4 file format
    (MP4 version 1), which in turn was derived from the QuickTime file format
    defined by Apple Computer. More recently the MP4 file format was
    generalized into the ISO Base Media File Format, which defines a general
    structure for time-based media files. It in turn is used as the basis
    for other file formats in the family.
  </p>
  <p>
    The JPEG 2000 file format is box (atom) structured, but is not time-based,
    and so does not derive from the ISO Base Media File Format.
  </p>
  <table is="mp4ra-table" v-bind:columns="['name', 'description']" v-bind:data="mp4ra.specifications.db"></table>
  <h2>Inline definitions not recorded in an external document</h2>
  <h3><a id="id3v2" name="id3v2"></a>ID3 version 2 meta-data</h3>
  <p>
    ID3 version 2 meta-data can be stored in meta-boxes as defined by the
    ISO base media file format. In this case, a handler type of 'ID32' is
    used in the meta-box. The actual meta-data is either stored in one or
    more ID32 box(es) inside the meta-data box, or this entire set of box(es)
    is referenced as the primary item, and stored elsewhere.
  </p>
  <pre><code>
    Box Type : 'ID32'
    Container: Meta box ('meta')
    Mandatory: No
    Quantity : Zero or more
  </code></pre>
  <p>
    The ID3v2 box contains a complete ID3 version 2.x.x data. It should be
    parsed according to <a href="http://www.id3.org/">http://www.id3.org/</a>
    specifications for v.2.x.x tags. There may be multiple ID3v2 boxes using
    different language codes.
  </p>
  <h3>Syntax</h3>
  <p>
    <pre><code>
      aligned(8) class ID3v2Box extends FullBox('ID32', version=0, 0) {
              const bit(1) pad = 0;
              unsigned int(5)[3] language; // ISO-639-2/T language code
              unsigned int(8) ID3v2data [];
      }
    </code></pre>
  </p>
  <h3>Semantics</h3>
  <h4><code>language</code></h4>
  <p>
    It declares the language code for the following text.
    See ISO 639-2/T for the set of three character codes. Each character
    is packed as the difference between its ASCII value and 0x60. The code
    is confined to being three lower-case letters, so these values are
    strictly positive. If there are some language fields inside ID3 tag,
    language must not conflict with them. Instead codes 'mul' (multiple
    languages) and 'und' (undetermined language) should be used in such cases
  </p>
  <h4><code>ID3v2data</code></h4>
  <p>
    A binary data that corresponds to ID3v2 tag
    format (e.g. for v.2.4.0: <a href="http://www.id3.org/id3v2.4.0-structure">http://www.id3.org/id3v2.4.0-structure</a>)
    and its native frames (e.g. for v.2.4.0: <a href="http://www.id3.org/id3v2.4.0-frames">http://www.id3.org/id3v2.4.0-frames</a>).
    ID3 tag must not contain any footer information, because it is never
    needed. Both, ID3v2 tag format and its native frames, must use the
    same version of the specification. Size of this field can be derived
    from the box size. The version of the ID3 data may be found by
    inspecting it.
  </p>
  <p>
    The ID3v2 box contains a complete ID3 version 2.x.x data. It should be
    parsed according to <a href="http://www.id3.org/">http://www.id3.org/</a>
    specifications for v.2.x.x tags.
  </p>
</main>
