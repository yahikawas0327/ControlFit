class DeleteFollowship < ActiveRecord::Migration[6.0]
  def up
    drop_table :followships
  end
end
