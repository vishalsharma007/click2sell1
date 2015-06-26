class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :Name
      t.text :Description

      t.timestamps null: false
    end
  end
end
