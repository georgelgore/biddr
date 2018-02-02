class Sale < ApplicationRecord
  belongs_to :house
  has_many :lots
  has_many :artists, through: :lots
end
