class AddToMember < ActiveRecord::Migration[6.0]
  def change
    add_column :members, :role, :string, default: 'user'
  end
end
