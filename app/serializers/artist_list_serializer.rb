class ArtistListSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :id, :image
end
