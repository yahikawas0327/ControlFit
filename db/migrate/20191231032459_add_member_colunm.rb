class AddMemberColunm < ActiveRecord::Migration[6.0]
  def change
    add_column :members, :gender, :string
    add_column :members, :age, :integer
    add_column :members, :cm, :integer
    add_column :members, :kg, :integer
  end
end
