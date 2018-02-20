<table class="codes" border=4 cellpadding=0 cellspacing=2>
  <thead>
    <tr>
      <th v-for="col in columns">{{ col }}</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in data">
      <td v-if="columns.indexOf('name') !== -1">
        <a v-bind:id="item.linkname" v-bind:name="item.linkname"></a>
        {{ item.specification }}
      </td>
      <td v-if="columns.indexOf('code') !== -1" class="code">
        {{ item.code }}
      </td>
      <td v-if="columns.indexOf('description') !== -1">
        <template v-if="hasHTMLLink(item.description)">
          <div v-rawhtml v-bind:data="item.description"/>
        </template>
        <template v-else>
          {{ item.description }}
        </template>
      </td>
      <td v-if="columns.indexOf('type') !== -1">
        {{ item.type }}
      </td>
      <td v-if="columns.indexOf('handler') !== -1">
        <div v-if="item.handlerAnchor">
          <a v-bind:href="'handler.html#' + item.handlerAnchor">
            {{ item.handler }}
          </a>
        </div>
        <div v-else>
          {{ item.handler }}
        </div>
      </td>
      <td v-if="columns.indexOf('specification') !== -1">
        <div v-if="item.specificationAnchor">
          <a v-bind:href="'specs.html#' + item.specificationAnchor">
            {{ item.specification }}
          </a>
        </div>
        <div v-else>
          {{ item.specification }}
        </div>
      </td>
      <td v-if="columns.indexOf('ObjectType') !== -1">
        {{ item.ObjectType }}
      </td>
    </tr>
  </tbody>
</table>
