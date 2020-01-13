class CreateFavorites < ActiveRecord::Migration[6.0]
  def change
    create_table :favorites do |t|
      t.belongs_to :member, null: false, foreign_key: true
      t.boolean :foodlike , :default => false
      t.integer :food_id
      t.boolean :sportlike , :default => false
      t.integer :sport_id

      t.timestamps
    end
  end
end
