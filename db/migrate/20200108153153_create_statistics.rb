class CreateStatistics < ActiveRecord::Migration[6.0]
  def change
    create_table :statistics do |t|
      t.decimal :sportsum
      t.integer :sportcount
      t.decimal :foodsum
      t.integer :foodcount
      t.belongs_to :member, null: false, foreign_key: true

      t.timestamps
    end
  end
end
