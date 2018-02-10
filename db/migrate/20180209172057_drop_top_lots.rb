class DropTopLots < ActiveRecord::Migration[5.1]
  def change
    drop_table :top_lots
  end
end
