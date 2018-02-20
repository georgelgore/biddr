class Api::V1::TopArtistsController < ApplicationController
  def index
    @top_artists = TopArtist.all
    render json: @top_artists
  end
end
