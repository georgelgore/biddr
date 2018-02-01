class AddEstimateRealizedIntToLots < ActiveRecord::Migration[5.1]
  def change
    add_column :lots, :estimate_low, :integer
    add_column :lots, :estimate_high, :integer
    add_column :lots, :realized, :integer
  end
end
