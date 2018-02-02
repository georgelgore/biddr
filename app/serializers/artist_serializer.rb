class ArtistSerializer < ActiveModel::Serializer
  attributes :name, :title_name, :image, :id
  has_many :lots

  def title_name
    object.name.titlecase
  end

  def image
    object.lots.last.image[0..-3] + "500"
  end
end
