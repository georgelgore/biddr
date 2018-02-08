class SaleListSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :id, :sale_date
end
