<% for(var i=0; i<components.length; i++) { %>export { default as <%= components[i] %> } from './<%= components[i] %>'
<% } %>