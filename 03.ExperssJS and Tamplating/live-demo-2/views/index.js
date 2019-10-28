
<h1>{{title}}</h1>
<p>{{body}}</p>

<form method="POST" action="/api/user">
  <div class="form-control">
    <label for="name">Name</label>
    <input id="name" name="name">
  </div>
  <div class="form-control">
    <label for="age">Age</label>
    <input id="age" name="age">
  </div>
  <button>Save</button>
</form>

<ul>
  {{#each users}}
  <li>
    {{this.firstName}}
    <form method="POST" action="/api/user/{{this.id}}?_method=DELETE">
      <button>Delete User</button>
    </form>
  </li>
  {{/each}}
</ul>