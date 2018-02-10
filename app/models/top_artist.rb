class TopArtist < ApplicationRecord
  has_many :top_lots
  has_many :top_sales, through: :top_lots
end
