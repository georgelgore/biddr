class Api::V1::ArtistsController < ApplicationController
  def index
    @artists = Artist.all.page(1)
    render json: @artists
  end

  def show
    @artist = Artist.find(params[:id])
    render json: @artist
  end

end
