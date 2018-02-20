class AddImageToTopSales < ActiveRecord::Migration[5.1]
  def change
    add_column :top_sales, :image, :string
  end
end
