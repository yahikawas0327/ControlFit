class AddMemberIdinSportRecord < ActiveRecord::Migration[6.0]
  def change
    add_column :sport_records, :member_id, :integer
    add_index :sport_records, :member_id
    add_column :food_records, :member_id, :integer
    add_index :food_records, :member_id
  end
end
