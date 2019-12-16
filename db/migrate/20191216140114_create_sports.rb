class CreateSports < ActiveRecord::Migration[6.0]
  def change
    create_table :sports do |t|
      t.string :name
      t.string :consume
      t.string :consume_40kg
      t.string :consume_50kg
      t.string :consume_60kg
      t.string :consume_70kg

      t.timestamps
    end
  end
end
