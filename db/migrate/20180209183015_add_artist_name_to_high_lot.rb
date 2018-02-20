class AddArtistNameToHighLot < ActiveRecord::Migration[5.1]
  def change
    add_column :high_lots, :artist_name, :string
  end
end
