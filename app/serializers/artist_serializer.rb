class ArtistSerializer < ActiveModel::Serializer
  attributes :name, :title_name, :image

  def title_name
    object.name.titlecase
  end

  def image
    object.lots.last.image
  end
end
