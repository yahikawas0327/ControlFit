class CreateFoodDatabases < ActiveRecord::Migration[6.0]
  def change
    create_table :food_databases do |t|
      t.string :name
      t.string :type
      t.decimal :calories
      t.decimal :protein
      t.decimal :fat_content
      t.decimal :carbohydrate

      t.timestamps
    end
  end
end
