class CreateMembersecrets < ActiveRecord::Migration[6.0]
  def change
    create_table :membersecrets do |t|
      t.decimal :bmi
      t.string :bmistatus
      t.decimal :ree
      t.decimal :bmr
      t.decimal :tdee
      t.belongs_to :member, null: false, foreign_key: true

      t.timestamps
    end
  end
end
