class Api::V1::LotsController < ApplicationController
  def index
    @lots = Lot.all.sort_by{|lot| lot.realized}[-5..-1]
    @artists = Artist.all.count{|artist| artist.name}
    h = Hash.new(0)
    byebug
    render json: {lots: @lots, artists: @artists }
  end

  def show
    @sale = Lot.find(params[:id])
    render json: @lot
  end

end
