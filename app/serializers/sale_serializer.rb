class SaleSerializer < ActiveModel::Serializer
  attributes :id, :house_id, :title, :internal_id, :sale_date
  has_many :lots

  #make sale sum on front
end
