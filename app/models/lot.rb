class Lot < ApplicationRecord
  attr_accessor :lot_id, :lot_lot_number, :lot_artist_id, :lot_image, :lot_art_title, :lot_size_mat, :lot_estimate_low, :lot_estimate_high, :lot_realized, :lot_sale_id
  belongs_to :sale
  belongs_to :artist

end
