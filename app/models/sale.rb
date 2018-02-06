class Sale < ApplicationRecord
  attr_accessor :sale_id, :sale_house_id, :sale_title, :sale_internal_id, :sale_sale_date
  belongs_to :house
  has_many :lots
  has_many :artists, through: :lots
end
