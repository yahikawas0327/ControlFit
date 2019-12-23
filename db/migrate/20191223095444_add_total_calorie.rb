class AddTotalCalorie < ActiveRecord::Migration[6.0]
  def change
    add_column :food_records, :total_calorie, :decimal
  end
end
