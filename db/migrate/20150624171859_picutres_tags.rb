class PicutresTags < ActiveRecord::Migration
  def change
   create_table :Pictures_tags , :id=> false do |t|
     t.integer :picture_id
     t.integer :tag_id
    end
  end
end
