// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require turbolinks
//= require_tree .





$(document).ready(function()
{ var no=0;
      $("#add_field_button").unbind('click').click( function()
           { ++no;
    	
              $("#file_fields_wrap").append($('<input type="file" name="album[pictures_attributes]['+no+'][photo]" id="album_pictures_attributes_'+no+'_photo"><br/><br/><label for="album_pictures_attributes_0_tags_attributes_0_Tag">Tag</label><input type="text" name="album[pictures_attributes]['+no+'][tags_attributes]['+no+'][name]" id="album_pictures_attributes_'+no+'_tags_attributes_'+no+'_name">'))

              	
          }

      );
});
