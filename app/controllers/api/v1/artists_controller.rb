class Api::V1::ArtistsController < ApplicationController
  def index
    @artists = Artist.all
    render json: ArtistListSerializer.new(@artists).serialized_json
  end

  def show
    @sale = Artist.find(params[:id])
    render json: ArtistSerializer.new(@artist).serialized_json
  end

end
