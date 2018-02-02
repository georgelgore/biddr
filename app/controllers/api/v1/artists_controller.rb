class Api::V1::ArtistsController < ApplicationController
  def index
    @artists = Artist.includes(:lots).all
    render json: @artists
  end

  def show
    @artist = Artist.includes(:lots).find(params[:id])
    render json: @artist
  end

end
