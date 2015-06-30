class AddColumnsToUser < ActiveRecord::Migration
  def change
    add_column :users, :Firstname, :string
    add_column :users, :Lastname, :string
    add_column :users, :Fullname, :string
  end
end
