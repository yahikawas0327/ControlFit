class AddAvatar < ActiveRecord::Migration[6.0]
  def change
    add_column :members, :avatar, :string
    add_column :members, :name, :string
  end
end
