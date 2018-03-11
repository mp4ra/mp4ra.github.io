<main role="main" class="container">
  <h1>Brands</h1>
  <p>
    This table documents the file brand identifiers, as used in the
    file-type and segment-type boxes. Each brand uniquely identifies a
    specification to which the file conforms, and gives 'permission' for
    a reader implementing at least that specification to display the file.
    Note that $20 here means the character 'white space'.
  </p>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification']" v-bind:data="mp4ra.brands.db"></table>
</main>
