class ArtistSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :id, :lots
  has_many :lots

end
