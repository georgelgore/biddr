class ArtistSerializer < ActiveModel::Serializer
  attributes :name, :title_name

  def title_name
    object.name.titlecase
  end
end
