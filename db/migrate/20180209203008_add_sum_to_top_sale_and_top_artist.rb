class AddSumToTopSaleAndTopArtist < ActiveRecord::Migration[5.1]
  def change
    add_column :top_sales, :sum, :integer
    add_column :top_artists, :sum, :integer
  end
end
