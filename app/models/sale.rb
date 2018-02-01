class Sale < ApplicationRecord
  belongs_to :house
  has_many :lots

  def sale_sum
    self.lots.map{|lot| lot.realized}.flatten.reduce(:+)
  end
end
