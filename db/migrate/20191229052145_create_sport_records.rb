class CreateSportRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :sport_records do |t|
      t.string :name
      t.decimal :weight
      t.decimal :min
      t.decimal :totalconsum , default: "0.0"

      t.timestamps
    end
  end
end
