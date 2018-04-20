<table class="table">
  <thead>
    <tr>
      <th scope="col" v-for="col in columns">{{ col }}</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in data">
      <td class="codes" v-if="columns.indexOf('name') !== -1">
        <a v-bind:name="item.linkname"/>
        {{ item.specification }}
      </td>
      <td v-if="columns.indexOf('code') !== -1" class="code">
        <a v-bind:name="item.code"/>
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
          <router-link class="nav-link" to="/misc">
            {{ item.handler }}
          </router-link>
        </div>
        <div v-else>
          {{ item.handler }}
        </div>
      </td>
      <td v-if="columns.indexOf('specification') !== -1">
        <div v-if="item.specificationAnchor">
          <router-link class="nav-link" to="/references">
            {{ item.specification }}
          </router-link>
        </div>
        <div v-else>
          {{ item.specification }}
        </div>
      </td>
      <td v-if="columns.indexOf('ObjectType') !== -1">
        {{ item.ObjectType }}
      </td>
      <td v-if="columns.indexOf('category') !== -1">
        <router-link class="nav-link" v-bind:to="'/' + item.category">
          {{ item.category | capitalize }}
        </router-link>
      </td>
    </tr>
  </tbody>
</table>
