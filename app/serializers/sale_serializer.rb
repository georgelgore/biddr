class SaleSerializer < ActiveModel::Serializer
  attributes :id, :house_id, :title, :internal_id, :sale_date, :sale_sum
  has_many :lots

  def sale_sum
    object.lots.map{|lot| lot.realized}.flatten.reduce(:+)
  end

end
