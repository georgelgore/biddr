class AddArtistAndSaleToTopLots < ActiveRecord::Migration[5.1]
  def change
    add_reference :top_lots, :artist, foreign_key: true
    add_reference :top_lots, :sale, foreign_key: true
  end
end
