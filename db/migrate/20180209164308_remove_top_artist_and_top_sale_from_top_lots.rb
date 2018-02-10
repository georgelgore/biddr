class RemoveTopArtistAndTopSaleFromTopLots < ActiveRecord::Migration[5.1]
  def change
    remove_column :top_lots, :top_sale_id, :bigint
    remove_column :top_lots, :top_artist_id, :bigint
  end
end
