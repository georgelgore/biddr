class SaleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :house_id, :title, :internal_id, :sale_date, :lots, :artists


  #make sale sum on front
end
