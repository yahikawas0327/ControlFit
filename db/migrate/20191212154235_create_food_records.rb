class CreateFoodRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :food_records do |t|
      t.string :name
      t.decimal :calories
      t.integer :qty
      t.string :eat_type

      t.timestamps
    end
  end
end
