<h1>{{title}}</h1>
<p>{{body}}</p>
<ul>
  {{#each users}}
  <li>{{this.id}} - {{this.firstName}}</li>
  {{/each}}
</ul>