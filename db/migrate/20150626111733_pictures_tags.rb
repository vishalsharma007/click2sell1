class PicturesTags < ActiveRecord::Migration
  
  def change
     create_table  :pictures_tags , :id=> false do |t|
     t.references :picture
     t.references :tag
  end
  add_index :pictures_tags , [:picture_id, :tag_id]
  add_index :pictures_tags , :tag_id
end
end

