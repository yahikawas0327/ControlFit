class remove_type < ActiveRecord::Migration[6.0]
  def change
    remove_column :food_databases, :type, :string
  end
end
