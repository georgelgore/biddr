class Artist < ApplicationRecord
  attr_accessor :artist_name, :artist_id
  has_many :lots
end
