class AddMemberSecretColumn < ActiveRecord::Migration[6.0]
  def change
    add_column :membersecrets, :foodintention, :string
    add_column :membersecrets, :sportintention, :string
  end
end
