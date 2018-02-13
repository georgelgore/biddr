class AddIdToTopSaleHighLotTopArtist < ActiveRecord::Migration[5.1]
  def change
    add_column :top_artists, :artist_id, :bigint
    add_column :top_sales, :sale_id, :bigint
    add_column :high_lots, :lot_id, :bigint
  end
end
