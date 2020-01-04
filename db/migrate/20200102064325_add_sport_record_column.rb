class AddSportRecordColumn < ActiveRecord::Migration[6.0]
  def change
      add_column :sport_records, :consume, :decimal
  end
end
