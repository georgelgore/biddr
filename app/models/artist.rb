class Artist < ApplicationRecord
  attr_accessor :artist_name, :artist_id, :artist_image
  has_many :lots
end
