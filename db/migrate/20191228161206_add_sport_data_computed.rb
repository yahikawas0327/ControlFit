class AddSportDataComputed < ActiveRecord::Migration[6.0]
  def change
    add_column :sports, :computed, :decimal , :default => 0
  end
end
