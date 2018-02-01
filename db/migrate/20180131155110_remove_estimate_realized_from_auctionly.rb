class RemoveEstimateRealizedFromAuctionly < ActiveRecord::Migration[5.1]
  def change
    remove_column :lots, :estimate_low, :string
    remove_column :lots, :estimate_high, :string
    remove_column :lots, :realized, :string
  end
end
