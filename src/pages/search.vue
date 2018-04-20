<main role="main" class="container">
  <h1>Search</h1>
  <p>
    Trying to find a 4cc, a specification, any information registered, just type
    in below the keyword you are looking for.
  </p>
  <div class="input-group mb-3">
    <input v-model="query" type="text" class="form-control" placeholder="Search ..." aria-label="Search">
</div>
  <table is="mp4ra-table" v-bind:columns="['code', 'description', 'specification', 'category']" v-bind:data="searchResult" v-if="query && query.length > 1"></table>
</main>
