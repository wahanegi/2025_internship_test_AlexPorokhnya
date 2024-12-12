class RenameUniqueTokenIdToJti < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :unique_token_id, :jti
  end
end
