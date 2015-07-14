/**
 * We.js user menu helper
 *
 * render user menu
 *
 * usage:  {{#we-user-menu 'manuName'}} {{/we-user-menu}}
 */

module.exports = function(we) {
  return function renderWidget() {
    var html =  '';

    if (this.req.isAuthenticated()) {
      html = '<li class="dropdown">'+
        '<a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">'+
          this.req.user.displayName+
          '<span class="caret"></span>'+
        '</a><ul class="dropdown-menu">';

      we.events.emit('we:render:user:menu:authenticated', {
        html: html, we: we, context: this
      });

      html += '<li class="divider"></li>'+
      '<li><a href="/auth/logout">'+
        '<i class="glyphicon glyphicon-log-out"></i> Logout'+
      '</a></li></ul></li>';
    } else {

      we.events.emit('we:render:user:menu:unAuthenticated', {
        html: html, we: we, context: this
      });
    }

    return new we.hbs.SafeString(html);
  }
}


//

//       <ul class="dropdown-menu">
// {{!--         <li>
//           {{#link-to 'user.findOne' req.user.id}}{{t 'Profile'}}{{/link-to}}
//         </li> --}}

//         <li class="divider"></li>
//         <li>{{#link-to 'auth.logout'}}
//           <i class="glyphicon glyphicon-log-out"></i> {{t 'Logout'}}
//         {{/link-to}}</li>
//       </ul>
//     </li>

//   {{else}}
//     <li>{{#link-to 'auth.login'}}{{t "login.block.button.text"}}{{/link-to}}</li>