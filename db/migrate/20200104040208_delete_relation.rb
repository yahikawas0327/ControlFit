class DeleteRelation < ActiveRecord::Migration[6.0]
  def up
    drop_table :relationships
  end
end
