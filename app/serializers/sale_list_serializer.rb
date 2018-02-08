class SaleListSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :id
end
