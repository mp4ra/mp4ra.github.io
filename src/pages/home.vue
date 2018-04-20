<main role="main" class="container">
  <div class="starter-template">
    <h1 class="display-1">MP4RA</h1>
    <p class="lead">
      Official Registration Authority for the ISOBMFF family of standards
    </p>
  </div>
  <h2>What it is for</h2>
  <p>
    This site is the registration authority for code-points in "MP4 Family" files.
    Within the documentation on this site are code-points from specifications
    both using and related to the ISO specifications for which this is the formal
    registry.

    Some MPEG systems code-points are here, including MPEG-4 ObjectType and
    StreamType.
    
    This site also acts as the registration database for QuickTime files; you will
    find the information for the standards family and QuickTime here. However, the
    data is separated to reflect the fact that the standards registration is
    distinct from the QuickTime registration. (In addition, the QuickTime data is
    not yet complete.) QuickTime code-points are documented here as this will be
    the QuickTime registration database, so that undesirable 'collisions' can be
    avoided, and to provide suggestions for code-points and practice when they are
    needed.
  </p>
  <h2>You can use it to</h2>
  <p>
    <ul>
      <li type="disc">find information about the <router-link to="/references">existing specifications</router-link> in this family;</li>
      <li type="disc">find the code points that have already been <router-link to="/atoms">registered</router-link>;</li>
      <li type="disc"><router-link to="/request">request</router-link> to register a code point;</li>
      <li type="disc">find information about <a href="#refsoft">reference software</a> for the file format.</li>
    </ul>
  </p>
  <h2>About</h2>
  <p>
    This site is run on behalf of the International Organization for
    Standardization, <a href="//www.iso.org/">ISO</a>, and supports in
    particular the working groups WG11 
    (<a href="//mpeg.chiariglione.org/">MPEG</a>) and WG01 
    (<a href="//www.jpeg.org/">JPEG</a>). However, a number of other
    organizations have specifications in the family.
  </p>
  <h2>What is registered</h2>
  <p>
    The registered code-points include four-character codes (4CCs) used in
    various ways within these file formats, and ObjectTypeIndication values
    used in MPEG-4 systems. The four-character codes are divided into various
    categories, for convenience. The largest category is the box (atom) types.
    The only box (atom) types which are not normally registered are boxes that
    are within the sample entry (sample description) for, and specific to, a
    codec or family of codecs, or that are used in a specific coding system
    (e.g. boxes used in a specific hint track).
  </p>
  <h2>Before requesting the registration of a code-point</h2>
  <p>
    Please consider these questions:
    <ol>
      <li type="1">
        Look at the existing specifications and practice; can your need be met
        with an existing definition (possibly from another organization)?
      </li>
      <li type="1">
        Can you use an existing extension mechanism (e.g. a UUID box)?
      </li>
      <li type="1">
        Is what you are defining stable, defined in such a way as to have
        longevity, and flexible enough to be a good general-purpose, public,
        design?
      </li>
    </ol>
  </p>
  <h2>Reference software</h2>
  <p>
    <a id="refsoft" name="refsoft"></a><em>Reference software</em> for the file
    format may be found hosted at
    <a href="//github.com/MPEGGroup/isobmff">Github</a> also.
  </p>
  <h2>Contact</h2>
  <p>
    Please see the <router-link to="/request">registration</router-link> section
    of the site for information on how to contact the registration authority.
    If you see errors or problems with the site, you may also file Github
    <a href="//github.com/mp4ra/mp4ra/issues">issues</a>.
  </p>
  <p>
    There is no cost for using this service. Apple Inc. operates this for the
    benefit of the standards community. Please use the email contact information
    in the <router-link to="/request">registration</router-link> section for any
    questions you have.
  </p>
  <p>
    The subject of the email <em>must</em> include the word &quot;mp4reg&quot;
    somewhere. <strong>Messages without &quot;mp4reg&quot; in their subject may
    be discarded as spam and never seen or acted on by a human.</strong>
  </p>
</main>
