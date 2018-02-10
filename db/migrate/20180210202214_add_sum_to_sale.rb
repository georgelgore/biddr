class AddSumToSale < ActiveRecord::Migration[5.1]
  def change
    add_column :sales, :sum, :integer
  end
end
