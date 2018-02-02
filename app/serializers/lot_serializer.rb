class LotSerializer < ActiveModel::Serializer
  attributes :id, :lot_number, :artist_id, :image, :art_title, :size_mat, :estimate_low, :estimate_high, :realized, :sale_id

  belongs_to :artist
  belongs_to :sale



end
