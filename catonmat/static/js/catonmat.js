/*
** Peteris Krumins (peter@catonmat.net)
** http://www.catonmat.net  --  good coders code, great reuse
**
** The new catonmat.net website.
**
** Code is licensed under GNU GPL license.
*/

catonmat = {

  /* Displays the comment form #comment_form after the element 
  ** 'element' and sets the hidden parent_id field to 'parent_id'.
  */
  show_comment_form: function(element, parent_id) {
    /* Display the comment form after 'element' and slide it out nicely */
    $('#comment_form').
      insertAfter(element).
      hide().
      slideDown('slow');

    /* Set the parent_id form value to the id of the comment we are
    ** replying to. */
    $('#parent_id').val(parent_id);
  },

  /* Restores the reply form to the end of the article (cancels replying). */
  restore_comment_form: function() {
    var p = $('#cancel_comment');
    catonmat.show_comment_form(p, '');
    p.hide();
  },

  /* Attach event handler to 'Reply to this comment', etc. */
  init_comments: function() {
    $('.comment_reply a').click(
      function(event) {
        var parent_id = this.id.split('_')[2];
        catonmat.show_comment_form(this, parent_id);

        /* Add a paragraph at the end of the comment list with a link to
        ** cancel replying, if the user wants just to add a new comment. */
        var a = $('<a href="#">Click here</a>').click(
                  function(event) {
                    catonmat.restore_comment_form();
                    event.preventDefault();
                  }
                );
        $('<p>').
          attr('id', 'cancel_comment').
          append(a).
          append(' to leave a new comment instead of replying to someone.').
          insertAfter('div.add h3');

        /* Add the 'Cancel' button, which when clicked cancels the comment form,
        ** and restores it back to the end of the article. */
        $('<a href="#" class="cancel">').
          append('<img src="/static/img/cancel-comment.gif" width="12" height="12">').
          append('Cancel').
          insertAfter(this).click(
            function(event) {
              catonmat.restore_comment_form();
              $(this).hide();
              event.preventDefault();
          });
        event.preventDefault();
      }
    );
  }

};
